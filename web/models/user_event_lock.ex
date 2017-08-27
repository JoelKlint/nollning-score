defmodule NollningScore.UserEventLock do
  use NollningScore.Web, :model

  schema "user_event_locks" do
    field :locked, :boolean
    belongs_to :event, NollningScore.Event
    belongs_to :user, NollningScore.User

    timestamps()
  end

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:locked, :event_id, :user_id])
    |> validate_required([:event_id, :user_id])
    |> foreign_key_constraint(:event_id)
    |> foreign_key_constraint(:user_id)
    |> unique_constraint(:event_id, name: :user_event_locks_event_id_user_id_index)
  end

end
