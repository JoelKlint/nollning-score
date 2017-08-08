defmodule NollningScore.Repo.Migrations.AddNotNullConstraintOnTables do
  use Ecto.Migration

  def up do
    alter table(:categories) do
      modify :event_id, :integer, null: false
    end
    alter table(:scores) do
      modify :category_id, :integer, null: false
      modify :guild_id, :integer, null: false
    end
  end

  def down do
    alter table(:categories) do
      modify :event_id, :integer, null: true
    end
    alter table(:scores) do
      modify :category_id, :integer, null: true
      modify :guild_id, :integer, null: true
    end
  end
end
