defmodule RoommateApi.Repo.Migrations.CreateFavoriteUsers do
  use Ecto.Migration

  def change do
    create table(:favorite_users, primary_key: false) do
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :favorite_user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false

      timestamps(type: :utc_datetime)
    end

    create unique_index(:favorite_users, [:user_id, :favorite_user_id])
    create index(:favorite_users, [:user_id])
    create index(:favorite_users, [:favorite_user_id])
  end
end
