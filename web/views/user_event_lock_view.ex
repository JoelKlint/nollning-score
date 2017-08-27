defmodule NollningScore.UserEventLockView do
  use NollningScore.Web, :view

  def render("index.json", %{user_event_locks: user_event_locks}) do
    %{
      type: :locks,
      data: render_many(user_event_locks, NollningScore.UserEventLockView, "user_event_lock.json")
    }
  end

  def render("show.json", %{user_event_lock: user_event_lock}) do
    %{
      type: :lock,
      data: render_one(user_event_lock, NollningScore.UserEventLockView, "user_event_lock.json")
    }
  end

  def render("user_event_lock.json", %{user_event_lock: user_event_lock}) do
    # Define own parameters to keep
    base = [:id, :locked]

    NollningScore.Support.View.render_object(user_event_lock, base)
  end
end
