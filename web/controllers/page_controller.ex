defmodule NollningScore.PageController do
  use NollningScore.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
