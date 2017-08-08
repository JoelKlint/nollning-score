defmodule NollningScore.Event do
  use NollningScore.Web, :model

  schema "events" do
    field :name, :string
    has_many :categories, NollningScore.Category

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name])
    |> validate_required([:name])
    |> unique_constraint(:name)
  end
end
