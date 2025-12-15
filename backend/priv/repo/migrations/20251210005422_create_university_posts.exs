defmodule RoommateApi.Repo.Migrations.CreateUniversityPosts do
  use Ecto.Migration

  def change do
    create table(:university_posts, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :university_name, :string
      add :title, :string
      add :content, :text
      add :category, :string

      timestamps(type: :utc_datetime)
    end

    create index(:university_posts, [:user_id])
    create index(:university_posts, [:university_name])
    create index(:university_posts, [:category])
  end
end
