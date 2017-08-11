defmodule NollningScore.Support.View do
  use NollningScore.Web, :view

  @doc """
  Creates a Map that can be converted to JSON
  """
  def render_object(object, base_params) do
    # Build base object
    base = Map.take(object, base_params)

    # TODO: Redo how relations array are created
    relations = []
    relations = relations ++ case Map.get(object, :guild) do
      %Ecto.Association.NotLoaded{} -> []
      _ -> [:guild]
    end
    relations = relations ++ case Map.get(object, :event) do
      %Ecto.Association.NotLoaded{} -> []
      _ -> [:event]
    end
    relations = relations ++ case Map.get(object, :category) do
      %Ecto.Association.NotLoaded{} -> []
      _ -> [:category]
    end
    relations = relations ++ case Map.get(object, :scores) do
      %Ecto.Association.NotLoaded{} -> []
      _ -> [:scores]
    end
    relations = relations ++ case Map.get(object, :categories) do
      %Ecto.Association.NotLoaded{} -> []
      _ -> [:categories]
    end
    relations = relations ++ case Map.get(object, :selected_guild) do
      %Ecto.Association.NotLoaded{} -> []
      _ -> [:selected_guild]
    end
    relations = relations ++ case Map.get(object, :user) do
      %Ecto.Association.NotLoaded{} -> []
      _ -> [:user]
    end

    # Populate relations
    relations = relations
    |> Enum.filter(fn r -> Map.has_key?(object, r) && is_loaded(Map.get(object, r)) end)
    |> Enum.map(fn r -> render_relation(r, object) end)

    # Return base if there are no relations
    if(Enum.empty?(relations)) do
      base
    # Return base with relations if there are relations
    else
      relations
      |> Enum.reduce(fn (x, acc) -> Map.merge(acc, x) end)
      |> Map.merge(base)
    end
  end

  # Defines how to render all entities in database
  # Both in plural and singular
  defp render_relation(relation, object) do
    case relation do
      :scores ->
        %{:scores => render_many(object.scores, NollningScore.ScoreView, "score.json")}
      :event ->
        %{:event => render_one(object.event, NollningScore.EventView, "event.json")}
      :category ->
        %{:category => render_one(object.category, NollningScore.CategoryView, "category.json")}
      :categories ->
        %{:categories => render_many(object.categories, NollningScore.CategoryView, "category.json")}
      :guild ->
        %{:guild => render_one(object.guild, NollningScore.GuildView, "guild.json")}
      :selected_guild ->
        %{:selected_guild => render_one(object.selected_guild, NollningScore.GuildView, "guild.json")}
      :user ->
        %{:user => render_one(object.user, NollningScore.UserView, "user.json")}
      _ ->
        %{}
    end
  end

  # Checks wheter association has been loaded
  defp is_loaded(object) do
    case object do
      %Ecto.Association.NotLoaded{} -> false
      _ -> true
    end
  end

end
