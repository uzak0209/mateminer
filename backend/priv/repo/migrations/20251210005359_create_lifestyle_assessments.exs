defmodule RoommateApi.Repo.Migrations.CreateLifestyleAssessments do
  use Ecto.Migration

  def change do
    create table(:lifestyle_assessments, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :question_id, :integer, null: false
      add :answer_value, :integer, null: false
      add :completed_at, :utc_datetime

      timestamps(type: :utc_datetime)
    end

    create index(:lifestyle_assessments, [:user_id])
  end
end
