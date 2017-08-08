defmodule NollningScore.CategoriesAcceptanceTest do
    use NollningScore.ConnCase

    setup %{conn: conn} do
        {:ok, conn: put_req_header(conn, "accept", "application/json")}
    end

    test "#index lists all categories related to the event", %{conn: conn} do
        event = Factory.insert(:event)
        Factory.insert(:category)
        categories = Factory.insert_list(5, :category, %{event: event})
        conn = conn |> get("/api/events/#{event.id}/categories/")
        assert conn |> json_response(200)
        assert length(Poison.decode!(conn.resp_body)["data"]) == length(categories)
    end

    test "#index returns an empty array if no categories exist", %{conn: conn} do
        event = Factory.insert(:event)
        conn = conn |> get("/api/events/#{event.id}/categories/")
        assert conn |> response(200)
        assert length(Poison.decode!(conn.resp_body)["data"]) == 0
    end

end