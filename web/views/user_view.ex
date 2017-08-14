defmodule NollningScore.UserView do
  use NollningScore.Web, :view

  def render("me.json", %{user: user}) do
    %{
      type: :me,
      data: render_one(user, NollningScore.UserView, "user.json")
    }
  end

  def render("user.json", %{user: user}) do
    # Define own parameters to keep
    base = [:id, :username, :role]

    NollningScore.Support.View.render_object(user, base)
  end
end
