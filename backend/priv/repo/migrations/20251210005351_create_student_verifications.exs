defmodule RoommateApi.Repo.Migrations.CreateStudentVerifications do
  use Ecto.Migration

  def change do
    create table(:student_verifications, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :student_card_image_url, :string
      add :university_name, :string
      add :status, :string, default: "pending"
      add :verified_at, :utc_datetime

      timestamps(type: :utc_datetime)
    end

    create index(:student_verifications, [:user_id])
    create index(:student_verifications, [:status])
  end
end
