defmodule NollningScore.ResultController do
  use NollningScore.Web, :controller

  alias NollningScore.Score
  alias NollningScore.Category
  alias NollningScore.Event
  alias NollningScore.Guild

  def show(conn, %{"event_id" => event_id}) do

    # Base result on all categories, including the absolute ones
    results = get_results(%{event_id: event_id})

    conn |> render("show.json", results: results)
  end

  def my_contribution(conn, %{"event_id" => event_id}) do

    user = Guardian.Plug.current_resource(conn)

    # Base result on only the categories that are not absolute and on the current user
    results = get_results(%{event_id: event_id, ignore_absolute: true, user_id: user.id})

    conn |> render("user_contribution.json", results: results)
  end


  """
    Returns the results

    # Params
      event_id: Which event to calculate results for
      include_absolute: Whether to include absolute categories or not
      user_id: Which user to base results on. All users if unspecified
  """
  defp get_results(%{:event_id => event_id} = params) do

    # Get event so it wont be fetched multiple times
    event = Repo.get!(Event, event_id)

    # interval categories
    interval_results = get_interval_results(params)

    # integer categories
    integer_results = get_integer_results(params)

    # boolean categories
    boolean_results = get_boolean_results(params)

    # guild_select categories
    guild_select_results = get_guild_select_results(params)

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
  end

  defp get_interval_results(%{:event_id => event_id} = params) do

    # Only base results on user if specified
    dynamic = if params[:user_id] do
      dynamic([s, c, e], s.user_id == ^params[:user_id])
    else
      true
    end

    # Ignore absolute categories if specified
    dynamic = if params[:ignore_absolute] do
      dynamic([s, c, e], c.absolute == false and ^dynamic)
    else
      dynamic
    end

    from(
      s in Score,
      join: c in Category, on: s.category_id == c.id,
      join: e in Event, on: c.event_id == e.id,
      where: e.id == ^event_id,
      where: c.type == "interval",
      where: ^dynamic,
      # where: (c.absolute == false) or (c.absolute == ^include_absolute),
      group_by: [s.guild_id, e.id],
      select: {s.guild_id, sum(s.value), e.id}
    ) |> Repo.all()
    |> Enum.map(fn {guild_id, result, event_id} ->
      %{
        guild: guild_id,
        result: result
      }
    end)
  end

  defp get_integer_results(%{:event_id => event_id} = params) do

    # Only base results on user if specified
    dynamic = if params[:user_id] do
      dynamic([g, s, c], s.user_id == ^params[:user_id])
    else
      true
    end

    # Ignore absolute categories if specified
    dynamic = if params[:ignore_absolute] do
      dynamic([g, s, c], c.absolute == false and ^dynamic)
    else
      dynamic
    end

    from(
      g in Guild,
      join: s in Score, on: s.guild_id == g.id,
      join: c in Category, on: s.category_id == c.id,
      where: c.event_id == ^event_id,
      where: c.type == "integer",
      where: ^dynamic,
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
  end

  defp get_boolean_results(%{:event_id => event_id} = params) do

    # Only base results on user if specified
    dynamic = if params[:user_id] do
      dynamic([g, s, c], s.user_id == ^params[:user_id])
    else
      true
    end

    # Ignore absolute categories if specified
    dynamic = if params[:ignore_absolute] do
      dynamic([g, s, c], c.absolute == false and ^dynamic)
    else
      dynamic
    end

    from(
      g in Guild,
      join: s in Score, on: s.guild_id == g.id,
      join: c in Category, on: s.category_id == c.id,
      where: c.event_id == ^event_id,
      where: c.type == "boolean",
      where: ^dynamic,
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
  end

  """
    OBS: THIS CAN NOT SELECT BASED ON USER!!!
  """
  defp get_guild_select_results(%{:event_id => event_id} = params) do

    # Ignore absolute categories if specified
    dynamic = if params[:ignore_absolute] do
      dynamic([c, g], c.absolute == false)
    else
      true
    end

    from(
      c in Category,
      join: g in Guild, on: c.selected_guild_id == g.id,
      where: c.type == "guild",
      where: c.event_id == ^event_id,
      where: ^dynamic,
      preload: [selected_guild: g]
    ) |> Repo.all
    |> Enum.map(fn category ->
      %{
        guild: category.selected_guild.id,
        result: category.weight,
      }
    end)
  end


end
