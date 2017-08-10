defmodule NollningScore.EventView do
  use NollningScore.Web, :view

  def render("index.json", %{events: events}) do
    %{
      type: :events,
      data: render_many(events, NollningScore.EventView, "event.json")
    }
  end

  def render("show.json", %{event: event}) do
    %{
      type: :event,
      data: render_one(event, NollningScore.EventView, "event.json")
    }
  end

  def render("event.json", %{event: event}) do
    # Define own parameters to keep
    base = [:id, :name]

    NollningScore.Support.View.render_object(event, base)
  end
end
