defmodule NollningScore.UserController do
  use NollningScore.Web, :controller

  alias NollningScore.User

  def me(conn, _params) do

    user = Guardian.Plug.current_resource(conn)
    case user do
      user ->
        conn |> render("me.json", user: user)
      nil ->
        conn
        |> put_status(404)
        |> render(NollningScore.ErrorView, "error.json", message: "No such user")
    end

  end

end
