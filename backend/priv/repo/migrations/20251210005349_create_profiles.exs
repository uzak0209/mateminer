defmodule RoommateApi.Repo.Migrations.CreateProfiles do
  use Ecto.Migration

  def change do
    create table(:profiles, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :nickname, :string
      add :age, :integer
      add :gender, :string
      add :user_type, :string
      add :university_name, :string
      add :faculty, :string
      add :department, :string
      add :grade, :integer
      add :campus, :string
      add :occupation, :string
      add :bio, :text
      add :video_url, :string
      add :avatar_url, :string

      timestamps(type: :utc_datetime)
    end

    create unique_index(:profiles, [:user_id])
    create index(:profiles, [:university_name])
    create index(:profiles, [:gender])
  end
end
