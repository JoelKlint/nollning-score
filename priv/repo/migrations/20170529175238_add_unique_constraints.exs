defmodule NollningScore.Repo.Migrations.AddUniqueConstraints do
  use Ecto.Migration

  def change do
    create unique_index(:events, :name)
    create unique_index(:categories, [:name, :event_id])
    drop index(:scores, :category_id)
    create unique_index(:scores, :category_id)
    create unique_index(:guilds, :name)
  end
end
