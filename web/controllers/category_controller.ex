defmodule NollningScore.CategoryController do
  use NollningScore.Web, :controller

  alias NollningScore.Category

  def index(conn, %{"event_id" => event_id}) do

    categories = from(
      c in Category, 
      where: c.event_id == type(^event_id, :integer)
    )
    |> Repo.all() 
    |> Repo.preload([:event])

    render(conn, "index.json", categories: categories, relations: [:event])
  end

  # def create(conn, %{"category" => category_params}) do
  #   changeset = Category.changeset(%Category{}, category_params)

  #   case Repo.insert(changeset) do
  #     {:ok, category} ->
  #       conn
  #       |> put_status(:created)
  #       |> put_resp_header("location", event_category_path(conn, :show, category.event_id, category))
  #       |> render("show.json", category: category)
  #     {:error, changeset} ->
  #       conn
  #       |> put_status(:unprocessable_entity)
  #       |> render(NollningScore.ChangesetView, "error.json", changeset: changeset)
  #   end
  # end

  # def show(conn, %{"id" => id}) do
  #   category = Repo.get!(Category, id)
  #   render(conn, "show.json", category: category)
  # end

  # def update(conn, %{"id" => id, "category" => category_params}) do
  #   category = Repo.get!(Category, id)
  #   changeset = Category.changeset(category, category_params)

  #   case Repo.update(changeset) do
  #     {:ok, category} ->
  #       render(conn, "show.json", category: category)
  #     {:error, changeset} ->
  #       conn
  #       |> put_status(:unprocessable_entity)
  #       |> render(NollningScore.ChangesetView, "error.json", changeset: changeset)
  #   end
  # end

  # def delete(conn, %{"id" => id}) do
  #   category = Repo.get!(Category, id)

  #   # Here we use delete! (with a bang) because we expect
  #   # it to always work (and if it does not, it will raise).
  #   Repo.delete!(category)

  #   send_resp(conn, :no_content, "")
  # end
end
