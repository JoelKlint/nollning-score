defmodule NollningScore.SessionView do
  use NollningScore.Web, :view

  def render("login.json", params) do

    base = [:jwt]

    NollningScore.Support.View.render_object(params, base)

  end

end
