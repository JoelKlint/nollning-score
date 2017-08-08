defmodule NollningScore.ResultAcceptanceTest do
    use NollningScore.ConnCase

    alias NollningScore.Repo
    alias NollningScore.Score

    setup %{conn: conn} do
        {:ok, conn: put_req_header(conn, "accept", "application/json")}
    end

    test "results for an event can be fetched", %{conn: conn} do
        event = Factory.insert(:event)
        cat1 = Factory.insert(:category, %{event: event})
        cat2 = Factory.insert(:category, %{event: event})
        cat3 = Factory.insert(:category, %{event: event})
        guild1 = Factory.insert(:guild)
        guild2 = Factory.insert(:guild)
        guild3 = Factory.insert(:guild)

        # Sum = 12
        Factory.insert(:score, %{guild: guild1, category: cat1, value: 5})
        Factory.insert(:score, %{guild: guild1, category: cat2, value: 4})
        Factory.insert(:score, %{guild: guild1, category: cat3, value: 3})

        # Sum = 9
        Factory.insert(:score, %{guild: guild2, category: cat1, value: 4})
        Factory.insert(:score, %{guild: guild2, category: cat2, value: 3})
        Factory.insert(:score, %{guild: guild2, category: cat3, value: 2})

        # Sum = 6
        Factory.insert(:score, %{guild: guild3, category: cat1, value: 3})
        Factory.insert(:score, %{guild: guild3, category: cat2, value: 2})
        Factory.insert(:score, %{guild: guild3, category: cat3, value: 1})

        conn = conn |> get("api/events/#{event.id}/results")

        assert json_response(conn, 200)
        result = Poison.decode!(conn.resp_body)["data"]

        result |> Enum.map(fn r ->
            result_guild_id = get_in(r, ["guild", "id"])
            cond do
                result_guild_id == guild1.id -> assert Map.get(r, "result") == 12
                result_guild_id == guild2.id -> assert Map.get(r, "result") == 9
                result_guild_id == guild3.id -> assert Map.get(r, "result") == 6
            end
        end)

    end

end