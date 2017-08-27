defmodule NollningScore.UserEventLockController do
  use NollningScore.Web, :controller

  alias NollningScore.UserEventLock

  def index(conn, %{"event_id" => event_id}) do
    locks = from(
      l in UserEventLock,
      where: l.event_id == ^event_id
    ) |> Repo.all

    conn |> render("index.json", user_event_locks: locks)

  end

  def create(conn, %{"event_id" => event_id}) do
    user = Guardian.Plug.current_resource(conn)

    lock = UserEventLock
    |> Repo.get_by(user_id: user.id, event_id: event_id)
    |> UserEventLock.changeset(%{user_id: user.id, event_id: event_id, locked: true})
    |> Repo.insert_or_update

    case lock do
      {:ok, struct} ->
        conn
        |> render("show.json", user_event_lock: struct)
      {:error, changeset} ->
        conn
        |> put_status(422)
        |> render(NollningScore.ChangesetView, "error.json", changeset: changeset)
    end
  end

end
