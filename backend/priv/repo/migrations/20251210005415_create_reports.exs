defmodule RoommateApi.Repo.Migrations.CreateReports do
  use Ecto.Migration

  def change do
    create table(:reports, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :reporter_user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :reported_user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :reason, :string
      add :description, :text
      add :status, :string, default: "pending"
      add :resolved_at, :utc_datetime

      timestamps(type: :utc_datetime)
    end

    create index(:reports, [:reporter_user_id])
    create index(:reports, [:reported_user_id])
    create index(:reports, [:status])
  end
end
