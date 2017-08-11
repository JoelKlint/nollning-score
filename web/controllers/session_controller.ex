defmodule NollningScore.SessionController do
  use NollningScore.Web, :controller

  alias NollningScore.User

  def create(conn, %{"username" => username, "password" => password}) do
    case User.authenticate(%{username: username, password: password}) do
      {:ok, user} ->
        new_conn = Guardian.Plug.api_sign_in(conn, user)
        jwt = Guardian.Plug.current_token(new_conn)

        session = %{ jwt: jwt, user: user}

        new_conn
        |> put_resp_header("authorization", "Bearer #{jwt}")
        |> render("login.json", session: session)
      {:error, _} ->
        conn
        |> put_status(401)
        |> render(NollningScore.ErrorView, "error.json", message: "Could not login")
    end

  end

  # Called when Guardian identifies an invalid jwt
  def unauthenticated(conn, _params) do
    conn
    |> put_status(401)
    |> render(NollningScore.ErrorView, "error.json", message: "Authentication required")
  end

  # Called when Guardian fails to ensure that this user exists
  def no_resource(conn, _params) do
    conn
    |> put_status(401)
    |> render(NollningScore.ErrorView, "error.json", message: "Authentication required")
  end

end
