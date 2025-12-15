defmodule RoommateApi.Repo.Migrations.CreateInterestTags do
  use Ecto.Migration

  def change do
    create table(:interest_tags, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :name, :string, null: false
      add :category, :string

      timestamps(type: :utc_datetime)
    end

    create unique_index(:interest_tags, [:name])
    create index(:interest_tags, [:category])
  end
end
