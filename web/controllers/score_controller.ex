defmodule NollningScore.ScoreController do
  use NollningScore.Web, :controller

  alias NollningScore.Score
  alias NollningScore.Category

  def index(conn, %{"event_id" => event_id}) do

    user = Guardian.Plug.current_resource(conn)

    score = from(
      s in Score,
      join: c in Category, on: s.category_id == c.id,
      where: c.event_id == ^event_id,
      where: s.user_id == ^user.id
    )
    |> Repo.all()
    |> Repo.preload([:category, :guild, :user])

    conn |> render("index.json", score: score, relations: [:category, :guild])
  end

  def create(conn, %{"score" => score_params, "category_id" => category_id}) do
    user = Guardian.Plug.current_resource(conn)
    params = score_params
    |> Map.take(["value", "guild_id"])
    |> Map.put("category_id", category_id)
    |> Map.put("user_id", user.id)

    category = Repo.get!(Category, category_id)
    case category.type do
      #  Handle a guild kind of category
      :guild ->
        result = category
        |> Category.changeset(%{selected_guild_id: Map.get(params, "guild_id")})
        |> Repo.update
        case result do
          {:ok, category} ->
            category = category |> Repo.preload([:selected_guild, :event])
            conn |> put_status(200) |> render(NollningScore.CategoryView, "show.json", category: category)
          {:error, changeset} ->
            conn |> put_status(422) |> render(NollningScore.ChangesetView, "error.json", changeset: changeset)
        end

      # Handle an interval, integer or boolean kind of category
      type when type in [:interval, :integer, :boolean] ->
        score = Repo.get_by(Score,
          category_id: params["category_id"],
          guild_id: params["guild_id"],
          user_id: user.id
        )
        result = case score do
          nil -> %Score{}
          score -> score
        end
        |> Score.changeset(params)
        |> Repo.insert_or_update
        case result do
          {:ok, score} ->
            score = Repo.preload(score, [:category, :guild, :user])
            conn
            |> put_status(201)
            |> render("show.json", score: score)
          {:error, changeset} ->
            conn
            |> put_status(422)
            |> render(NollningScore.ChangesetView, "error.json", changeset: changeset)
        end

      # Handle undefined categories
      _ ->
        %{error: "No such category"}
    end
  end

end
