defmodule NollningScore.ScoresAcceptanceTest do
    use NollningScore.ConnCase

    setup %{conn: conn} do
        {:ok, conn: put_req_header(conn, "accept", "application/json")}
    end

    test "#index lists all related scores", %{conn: conn} do
        category = Factory.insert(:category)
        Factory.insert(:score, %{category: category})
        Factory.insert(:score)
        conn = conn |> get("/api/categories/#{category.id}/scores")
        assert conn |> json_response(200)
        assert length(Poison.decode!(conn.resp_body)["data"]) == 1
    end

    test "#index returns empty array if db empty", %{conn: conn} do
        category = Factory.insert(:category)
        conn = conn |> get("/api/categories/#{category.id}/scores")
        assert conn |> json_response(200)
        assert length(Poison.decode!(conn.resp_body)["data"]) == 0
    end

    test "#create creates a new score with valid params", %{conn: conn} do
        category = Factory.insert(:category)
        valid_params = Factory.params_with_assocs(:score, %{category: category})
        conn = conn |> post("/api/categories/#{category.id}/scores", %{score: valid_params})

        response = assert json_response(conn, 201) |> Map.get("data")
        assert valid_params.guild_id == response["guild_id"]
        assert valid_params.category_id == response["category_id"]
        assert valid_params.value == response["value"]
    end

    test "#create does not create a new score with invalid params", %{conn: conn} do
        category = Factory.insert(:category)
        invalid_params = %{}
        conn = conn |> post("/api/categories/#{category.id}/scores", %{score: invalid_params})

        assert response(conn, 422)
    end

    test "#create replaces a score if it already exists", %{conn: conn} do
        score = Factory.insert(:score)
        params = Factory.params_with_assocs(:score) |> Map.take([:guild_id, :value])
        conn = conn |> post("api/categories/#{score.category.id}/scores", %{score: params})

        response = assert json_response(conn, 201) |> Map.get("data")
        assert params.guild_id == response["guild_id"]
        assert score.category.id == response["category_id"]
        assert params.value == response["value"]
    end

end