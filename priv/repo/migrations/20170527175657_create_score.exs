defmodule NollningScore.Repo.Migrations.CreateScore do
  use Ecto.Migration

  def change do
    create table(:scores) do
      add :value, :integer
      add :category_id, references(:categories, on_delete: :nothing)

      timestamps()
    end
    create index(:scores, [:category_id])

  end
end
