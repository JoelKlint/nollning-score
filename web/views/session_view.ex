defmodule NollningScore.SessionView do
  use NollningScore.Web, :view

  def render("login.json", %{session: session}) do
    %{
      type: :login,
      data: render_one(session, NollningScore.SessionView, "session.json")
    }
  end

  def render("session.json", %{session: session}) do
    base = [:jwt]

    NollningScore.Support.View.render_object(session, base)
  end

end
