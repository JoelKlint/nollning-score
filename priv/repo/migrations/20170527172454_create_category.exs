defmodule NollningScore.Repo.Migrations.CreateCategory do
  use Ecto.Migration

  def change do
    create table(:categories) do
      add :name, :string
      add :min, :integer
      add :max, :integer
      add :event_id, references(:events, on_delete: :nothing)

      timestamps()
    end
    create index(:categories, [:event_id])

  end
end
