defmodule NollningScore.GuildController do
  use NollningScore.Web, :controller

  alias NollningScore.Guild

  def index(conn, _params) do
    guilds = Repo.all(Guild)
    render(conn, "index.json", guilds: guilds)
  end

  # def create(conn, %{"guild" => guild_params}) do
  #   changeset = Guild.changeset(%Guild{}, guild_params)

  #   case Repo.insert(changeset) do
  #     {:ok, guild} ->
  #       conn
  #       |> put_status(:created)
  #       |> put_resp_header("location", guild_path(conn, :show, guild))
  #       |> render("show.json", guild: guild)
  #     {:error, changeset} ->
  #       conn
  #       |> put_status(:unprocessable_entity)
  #       |> render(NollningScore.ChangesetView, "error.json", changeset: changeset)
  #   end
  # end

  # def show(conn, %{"id" => id}) do
  #   guild = Repo.get!(Guild, id)
  #   render(conn, "show.json", guild: guild)
  # end

  # def update(conn, %{"id" => id, "guild" => guild_params}) do
  #   guild = Repo.get!(Guild, id)
  #   changeset = Guild.changeset(guild, guild_params)

  #   case Repo.update(changeset) do
  #     {:ok, guild} ->
  #       render(conn, "show.json", guild: guild)
  #     {:error, changeset} ->
  #       conn
  #       |> put_status(:unprocessable_entity)
  #       |> render(NollningScore.ChangesetView, "error.json", changeset: changeset)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   guild = Repo.get!(Guild, id)

  #   # Here we use delete! (with a bang) because we expect
  #   # it to always work (and if it does not, it will raise).
  #   Repo.delete!(guild)

  #   send_resp(conn, :no_content, "")
  # end
end
