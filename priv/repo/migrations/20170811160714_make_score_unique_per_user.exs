defmodule NollningScore.Repo.Migrations.MakeScoreUniquePerUser do
  use Ecto.Migration

  def change do

    drop unique_index(:scores, [:category_id, :guild_id])

    alter table(:scores) do
      add :user_id, references(:users, on_delete: :nothing)
    end

    create unique_index(:scores, [:category_id, :guild_id, :user_id])

  end
end
