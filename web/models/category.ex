defmodule NollningScore.Category do
  use NollningScore.Web, :model

  schema "categories" do
    field :name, :string
    field :min, :integer
    field :max, :integer
    belongs_to :event, NollningScore.Event
    has_many :scores, NollningScore.Score

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :min, :max, :event_id])
    |> validate_required([:name, :min, :max, :event_id])
    |> foreign_key_constraint(:event_id)
    |> unique_constraint(:name, name: :categories_name_event_id_index)
  end
end
