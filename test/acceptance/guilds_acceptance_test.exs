defmodule NollningScore.GuildsAcceptanceTest do
    use NollningScore.ConnCase

    setup %{conn: conn} do
        {:ok, conn: put_req_header(conn, "accept", "application/json")}
    end

    test "#index returns all guilds", %{conn: conn} do
        guilds = Factory.insert_list(3, :guild)
        conn = conn |> get("/api/guilds")
        
        assert json_response(conn, 200)
        response = Poison.decode!(conn.resp_body)["data"]
        assert length(response) == length(guilds)
    end

end