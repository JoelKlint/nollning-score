defmodule NollningScore.PageController do
  use NollningScore.Web, :controller

  """
    Serves the pre-built React frontend.
  """
  def index(conn, _params) do
    html(conn, File.read!("priv/react/build/index.html"))
  end
end
