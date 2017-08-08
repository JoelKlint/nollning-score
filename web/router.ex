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

  scope "/", NollningScore do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  scope "/api", NollningScore do
    pipe_through :api

    resources "/events", EventController, only: [:index, :show] do
      resources "/scores", ScoreController, only: [:index]
      resources "/categories", CategoryController, only: [:index]
      get "/results", ResultController, :show
    end

    resources "/categories", CategoryController, only: [] do
      resources "/scores", ScoreController, only: [:create]
    end

    resources "/guilds", GuildController, only: [:index]

  end
end
