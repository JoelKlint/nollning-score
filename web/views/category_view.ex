defmodule NollningScore.CategoryView do
  use NollningScore.Web, :view

  def render("index.json", %{categories: categories}) do
    %{data: render_many(categories, NollningScore.CategoryView, "category.json")}
  end

  def render("show.json", %{category: category}) do
    %{data: render_one(category, NollningScore.CategoryView, "category.json")}
  end

  def render("category.json", %{category: category}) do
    # Define own parameters to keep
    base = [:id, :name, :interval_min, :interval_max, :type, :absolute, :global, :weight]

    NollningScore.Support.View.render_object(category, base)
  end
end
