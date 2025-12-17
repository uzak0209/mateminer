defmodule RoommateApi.Repo.Migrations.CreateViewHistory do
  use Ecto.Migration

  def change do
    create table(:view_history, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :viewed_user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :viewed_at, :utc_datetime

      timestamps(type: :utc_datetime)
    end

    create index(:view_history, [:user_id])
    create index(:view_history, [:viewed_user_id])
  end
end
