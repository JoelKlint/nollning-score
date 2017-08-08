defmodule NollningScore.CategoryView do
  use NollningScore.Web, :view

  def render("index.json", %{categories: categories, relations: relations}) do
    %{data: render_many(categories, NollningScore.CategoryView, "category.json", relations: relations)}
  end

  def render("show.json", %{category: category}) do
    %{data: render_one(category, NollningScore.CategoryView, "category.json")}
  end

  def render("category.json", %{category: category, relations: relations}) do

    attrs = [:id, :name, :min, :max] ++ (relations || [])

    category
    |> Map.take(attrs)
    |> populate_relations(relations)

  end

  # Iterates over all relations and populates them
  defp populate_relations(category, relations) do
    result = category
    if(Enum.member?(relations, :scores)) do
      result = result |> Map.update!(:scores, &render_many(&1, NollningScore.ScoreView, "score.json", relations: []))
    end
    if(Enum.member?(relations, :event)) do
      result = result |> Map.update!(:event, &render_one(&1, NollningScore.EventView, "event.json", relations: []))
    end
    result 
  end
end
