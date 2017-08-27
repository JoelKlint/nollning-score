defmodule NollningScore.Repo.Migrations.AddUserEventLock do
  use Ecto.Migration

  def change do
    create table(:user_event_locks) do
      add :event_id, references(:events, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)
      add :locked, :boolean

      timestamps()
    end

    create unique_index(:user_event_locks, [:event_id, :user_id])

  end
end
