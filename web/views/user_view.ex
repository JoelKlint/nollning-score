defmodule NollningScore.UserView do
  use NollningScore.Web, :view

  def render("show.json", %{user: user}) do
    %{
      type: :user,
      data: render_one(user, NollningScore.UserView, "user.json")
    }
  end

  def render("user.json", %{user: user}) do
    # Define own parameters to keep
    base = [:username]

    NollningScore.Support.View.render_object(user, base)
  end
end
