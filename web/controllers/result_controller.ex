defmodule NollningScore.ResultController do
  use NollningScore.Web, :controller

  alias NollningScore.Score
  alias NollningScore.Category
  alias NollningScore.Event
  alias NollningScore.Guild

  def show(conn, %{"event_id" => event_id}) do

    # Get event so it wont be fetched multiple times
    event = Repo.get!(Event, event_id)

    # interval categories
    interval_results = from(
      s in Score,
      join: c in Category, on: s.category_id == c.id,
      join: e in Event, on: c.event_id == e.id,
      where: e.id == ^event_id,
      where: c.type == "interval",
      group_by: [s.guild_id, e.id],
      select: {s.guild_id, sum(s.value), e.id}
    )
    |> Repo.all()
    |> Enum.map(fn {guild_id, result, event_id} ->
      %{
        guild: guild_id,
        result: result
      }
    end)

    # integer categories
    integer_results = from(
      g in Guild,
      join: s in Score, on: s.guild_id == g.id,
      join: c in Category, on: s.category_id == c.id,
      where: c.event_id == ^event_id,
      where: c.type == "integer",
      preload: [scores: {s, category: c}]
    ) |> Repo.all
    |> Enum.map(fn guild ->
      # Replace score struct with score_value * category_weight
      guild_score_sum = Enum.map(guild.scores, fn score ->
        score.value * score.category.weight
      end)
      |> Enum.sum
      guild = Map.drop(guild, [:scores])
      %{
        guild: guild.id,
        result: guild_score_sum,
      }
    end)

    # boolean categories
    boolean_results = from(
      g in Guild,
      join: s in Score, on: s.guild_id == g.id,
      join: c in Category, on: s.category_id == c.id,
      where: c.event_id == ^event_id,
      where: c.type == "boolean",
      preload: [scores: {s, category: c}]
    ) |> Repo.all
    |> Enum.map(fn guild ->
      # Replace score struct with category_weight
      guild_score_sum = Enum.map(guild.scores, fn score ->
        case score.value do
          1 -> score.category.weight
          _ -> 0
        end
      end)
      |> Enum.sum
      guild = Map.drop(guild, [:scores])
      %{
        guild: guild.id,
        result: guild_score_sum,
      }
    end)

    # guild_select categories
    guild_select_results = from(
      c in Category,
      join: g in Guild, on: c.selected_guild_id == g.id,
      where: c.type == "guild",
      where: c.event_id == ^event_id,
      preload: [selected_guild: g]
    ) |> Repo.all
    |> Enum.map(fn category ->
      %{
        guild: category.selected_guild.id,
        result: category.weight,
      }
    end)

    # Sum all results
    results = Enum.concat([
      interval_results,
      integer_results,
      boolean_results,
      guild_select_results
    ])
    |> Enum.group_by(&Map.get(&1, :guild))
    |> Enum.map(fn({guild_id, results_for_guild}) ->
      result = Enum.map(results_for_guild, fn res_object ->
        res_object.result
      end) |> Enum.sum
      %{
        guild: Repo.get(Guild, guild_id),
        result: result,
        event: event
      }
    end)

    # TODO: Return zero for those guilds that do not exist

    conn |> render("show.json", results: results)

  end
end
