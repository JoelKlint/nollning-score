defmodule NollningScore.Repo.Migrations.AddRoleToUser do
  use Ecto.Migration

  def change do
    alter table(:users) do
      add :role, :integer, null: false, default: 0
    end
  end
end
