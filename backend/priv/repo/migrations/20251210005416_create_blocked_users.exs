defmodule RoommateApi.Repo.Migrations.CreateBlockedUsers do
  use Ecto.Migration

  def change do
    create table(:blocked_users, primary_key: false) do
      add :blocker_user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :blocked_user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :blocked_at, :utc_datetime

      timestamps(type: :utc_datetime)
    end

    create unique_index(:blocked_users, [:blocker_user_id, :blocked_user_id])
    create index(:blocked_users, [:blocker_user_id])
    create index(:blocked_users, [:blocked_user_id])
  end
end
