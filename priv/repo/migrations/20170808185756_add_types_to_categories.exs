defmodule NollningScore.Repo.Migrations.AddTypesToCategories do
  use Ecto.Migration

  def change do
    alter table(:categories) do
      add :type, :integer, null: false, default: 0
      add :absolute, :boolean, null: false, default: false
      add :global, :boolean, null: false, default: false
      add :weight, :integer, null: false, default: 1
    end
      rename table(:categories), :min, to: :interval_min
      rename table(:categories), :max, to: :interval_max
  end
end
