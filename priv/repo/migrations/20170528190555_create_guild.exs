defmodule NollningScore.Repo.Migrations.CreateGuild do
  use Ecto.Migration

  def change do
    create table(:guilds) do
      add :name, :string

      timestamps()
    end

    alter table(:scores) do
      add :guild_id, references(:guilds, on_delete: :nothing)
    end

  end
end
