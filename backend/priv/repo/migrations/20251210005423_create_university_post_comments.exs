defmodule RoommateApi.Repo.Migrations.CreateUniversityPostComments do
  use Ecto.Migration

  def change do
    create table(:university_post_comments, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :post_id, references(:university_posts, type: :uuid, on_delete: :delete_all), null: false
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :content, :text

      timestamps(type: :utc_datetime)
    end

    create index(:university_post_comments, [:post_id])
    create index(:university_post_comments, [:user_id])
  end
end
