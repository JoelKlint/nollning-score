defmodule NollningScore.ScoreView do
  use NollningScore.Web, :view

  def render("index.json", %{score: score, relations: relations}) do
    %{data: render_many(score, NollningScore.ScoreView, "score.json", relations: relations)}
  end

  def render("show.json", %{score: score, relations: relations}) do
    %{data: render_one(score, NollningScore.ScoreView, "score.json", relations: relations)}
  end

  def render("score.json", %{score: score, relations: relations}) do

    attrs = [:id, :value] ++ (relations || [])

    score
    |> Map.take(attrs)
    |> populate_relations(relations)
  end

  # Iterates over all relations and populates them
  defp populate_relations(score, relations) do
    result = score
    if(Enum.member?(relations, :category)) do
      result = result |> Map.update!(:category, &render_one(&1, NollningScore.CategoryView, "category.json", relations: []))
    end
    if(Enum.member?(relations, :guild)) do
      result = result |> Map.update!(:guild, &render_one(&1, NollningScore.GuildView, "guild.json"))
    end
    result 
  end
end
