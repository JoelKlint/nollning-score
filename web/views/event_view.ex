defmodule NollningScore.EventView do
  use NollningScore.Web, :view

  def render("index.json", %{events: events, relations: relations}) do
    %{data: render_many(events, NollningScore.EventView, "event.json", relations: relations)}
  end

  def render("show.json", %{event: event, relations: relations}) do
    %{data: render_one(event, NollningScore.EventView, "event.json", relations: relations)}
  end

  # def render("event.json", %{event: event, relations: relations}) do
  #   %{id: event.id,
  #     name: event.name}
  # end

  def render("event.json", %{event: event, relations: relations}) do

    attrs = [:id, :name] ++ (relations || [])

    event
    |> Map.take(attrs)
    |> populate_relations(relations)

  end

  # Iterates over all relations and populates them
  defp populate_relations(category, relations) do
    result = category
    if(Enum.member?(relations, :categories)) do
      result = result |> Map.update!(:categories, &render_many(&1, NollningScore.CategoryView, "category.json", relations: []))
    end
    result 
  end
end
