defmodule NollningScore.Repo.Migrations.AddSelectedGuildToCategories do
  use Ecto.Migration

  def change do
    alter table(:categories) do
      add :selected_guild_id, references(:guilds, on_delete: :nothing)
    end
  end
end
