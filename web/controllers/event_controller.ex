defmodule NollningScore.EventController do
  use NollningScore.Web, :controller

  alias NollningScore.Event

  def index(conn, _params) do
    events = Repo.all(Event) |> Repo.preload(:categories)
    render(conn, "index.json", events: events)
  end

  # def create(conn, %{"event" => event_params}) do
  #   changeset = Event.changeset(%Event{}, event_params)

  #   case Repo.insert(changeset) do
  #     {:ok, event} ->
  #       conn
  #       |> put_status(:created)
  #       |> put_resp_header("location", event_path(conn, :show, event))
  #       |> render("show.json", event: event)
  #     {:error, changeset} ->
  #       conn
  #       |> put_status(:unprocessable_entity)
  #       |> render(NollningScore.ChangesetView, "error.json", changeset: changeset)
  #   end
  # end

  def show(conn, %{"id" => id}) do
    case Repo.get(Event, id) do
      nil ->
        conn
        |> put_status(404)
        |> render(NollningScore.ErrorView, "404.json")
      record ->
        record = record |> Repo.preload(:categories)
        conn |> render("show.json", event: record)
    end
  end

  # def update(conn, %{"id" => id, "event" => event_params}) do
  #   event = Repo.get!(Event, id)
  #   changeset = Event.changeset(event, event_params)

  #   case Repo.update(changeset) do
  #     {:ok, event} ->
  #       render(conn, "show.json", event: event)
  #     {:error, changeset} ->
  #       conn
  #       |> put_status(:unprocessable_entity)
  #       |> render(NollningScore.ChangesetView, "error.json", changeset: changeset)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   event = Repo.get!(Event, id)

  #   # Here we use delete! (with a bang) because we expect
  #   # it to always work (and if it does not, it will raise).
  #   Repo.delete!(event)

  #   send_resp(conn, :no_content, "")
  # end
end
