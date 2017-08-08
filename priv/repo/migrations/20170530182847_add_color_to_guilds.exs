defmodule NollningScore.Repo.Migrations.AddColorToGuilds do
  use Ecto.Migration

  def change do
    alter table(:guilds) do
      add :color, :string, size: 7, null: false, default: "#ffffff"
    end

  end
end
