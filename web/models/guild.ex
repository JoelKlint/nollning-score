defmodule NollningScore.Guild do
  use NollningScore.Web, :model

  schema "guilds" do
    field :name, :string
    field :color, :string
    has_many :scores, NollningScore.Score

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :color])
    |> validate_required([:name, :color])
    |> validate_length(:color, is: 7)
    |> unique_constraint(:name)
  end
end
