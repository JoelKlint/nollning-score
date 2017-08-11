defmodule NollningScore.Router do
  use NollningScore.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :api_auth do
    plug Guardian.Plug.VerifyHeader, realm: "Bearer"
    plug Guardian.Plug.LoadResource
    plug Guardian.Plug.EnsureAuthenticated, handler: NollningScore.SessionController
  end

  scope "/", NollningScore do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", NollningScore do
    pipe_through [:api, :api_auth]

    resources "/events", EventController, only: [:index, :show] do
      resources "/scores", ScoreController, only: [:index]
      resources "/categories", CategoryController, only: [:index]
      get "/results", ResultController, :show
    end

    resources "/categories", CategoryController, only: [] do
      resources "/scores", ScoreController, only: [:create]
    end

    resources "/guilds", GuildController, only: [:index]

    post "/login", SessionController, :create

  end
end
