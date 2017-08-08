defmodule NollningScore.EventsAcceptanceTest do
    use NollningScore.ConnCase

    alias NollningScore.EventView

    @route "/api/events"

    setup %{conn: conn} do
        {:ok, conn: put_req_header(conn, "accept", "application/json")}
    end

    test "#index lists all events", %{conn: conn} do
        events = Factory.insert_list(3, :event)
        conn = conn |> get(@route)
        assert conn |> json_response(200) == TestHelper.render_json(EventView, "index.json", events: events)
    end

    test "#index returns empty array if db empty", %{conn: conn} do
        conn = conn |> get(@route)
        assert conn |> json_response(200) == TestHelper.render_json(EventView, "index.json", events: [])
    end

    test "#show returns specified entry", %{conn: conn} do
        event = Factory.insert(:event)
        conn = conn |> get(@route <> "/" <> Integer.to_string(event.id))
        assert conn |> json_response(200) == TestHelper.render_json(EventView, "show.json", event: event)
    end

    test "#show returns error if entry does not exist", %{conn: conn} do
        conn = conn |> get(@route <> "/-1")
        assert conn |> response(404)
    end

end