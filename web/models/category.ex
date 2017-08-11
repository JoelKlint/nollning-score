require EctoEnum
EctoEnum.defenum CategoryTypeEnum, interval: 0, integer: 1, boolean: 2, guild: 3

defmodule NollningScore.Category do
  use NollningScore.Web, :model

  schema "categories" do
    field :name, :string
    field :type, CategoryTypeEnum
    field :absolute, :boolean
    field :global, :boolean
    field :weight, :integer
    field :interval_min, :integer
    field :interval_max, :integer
    belongs_to :event, NollningScore.Event
    has_many :scores, NollningScore.Score
    belongs_to :selected_guild, NollningScore.Guild

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:name, :interval_min, :interval_max, :event_id, :type, :absolute, :global, :weight, :selected_guild_id])
    |> validate_required([:name, :event_id])
    |> foreign_key_constraint(:event_id)
    |> unique_constraint(:name, name: :categories_name_event_id_index)
  end
end
