defmodule NollningScore.Score do
  use NollningScore.Web, :model

  schema "scores" do
    field :value, :integer
    belongs_to :category, NollningScore.Category
    belongs_to :guild, NollningScore.Guild
    belongs_to :user, NollningScore.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:value, :category_id, :guild_id, :user_id])
    |> validate_required([:value, :category_id, :guild_id, :user_id])
    |> foreign_key_constraint(:category_id)
    |> foreign_key_constraint(:guild_id)
    |> foreign_key_constraint(:user_id)
    |> unique_constraint(:guild_id, name: :scores_category_id_guild_id_user_id_index)
  end
end
