defmodule RoommateApi.Repo.Migrations.CreateUserInterests do
  use Ecto.Migration

  def change do
    create table(:user_interests, primary_key: false) do
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :interest_tag_id, references(:interest_tags, type: :uuid, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create unique_index(:user_interests, [:user_id, :interest_tag_id])
    create index(:user_interests, [:user_id])
    create index(:user_interests, [:interest_tag_id])
  end
end
