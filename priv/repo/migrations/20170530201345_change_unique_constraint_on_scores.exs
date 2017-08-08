defmodule NollningScore.Repo.Migrations.ChangeUniqueConstraintOnScores do
  use Ecto.Migration

  def change do
    drop index(:scores, :category_id)
    create unique_index(:scores, [:category_id, :guild_id])
  end
end
