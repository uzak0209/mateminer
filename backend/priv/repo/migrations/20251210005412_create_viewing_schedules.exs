defmodule RoommateApi.Repo.Migrations.CreateViewingSchedules do
  use Ecto.Migration

  def change do
    create table(:viewing_schedules, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :property_candidate_id, references(:property_candidates, type: :uuid, on_delete: :delete_all), null: false
      add :scheduled_date, :utc_datetime
      add :location, :text
      add :notes, :text
      add :status, :string, default: "scheduled"

      timestamps(type: :utc_datetime)
    end

    create index(:viewing_schedules, [:property_candidate_id])
    create index(:viewing_schedules, [:status])
  end
end
