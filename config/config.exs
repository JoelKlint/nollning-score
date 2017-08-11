# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :nollning_score,
  ecto_repos: [NollningScore.Repo]

# Configures the endpoint
config :nollning_score, NollningScore.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "7pGHqCk2qonmd8DPNfz8bb1hCseL5mZO/nQ5IW4NfqgMtHQqQgF7WbvWDYvzOm6U",
  render_errors: [view: NollningScore.ErrorView, accepts: ~w(html json)],
  pubsub: [name: NollningScore.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :guardian, Guardian,
  allowed_algos: ["HS512"], # optional
  verify_module: Guardian.JWT,  # optional
  issuer: "nollning_score",
  ttl: { 30, :days },
  allowed_drift: 2000,
  verify_issuer: true, # optional
  # TODO: Replace secret_key with ENVIRONMENT VARIABLE
  secret_key: "vbk9Zrn5w1D7U2zUPey37NX9DZygy1lFXMSyLCYu/VorzxFzal7dcwsqp9UU6JZC",
  serializer: NollningScore.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
