defmodule RoommateApi.Repo.Migrations.CreateSocialConnections do
  use Ecto.Migration

  def change do
    create table(:social_connections, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :provider, :string, null: false
      add :provider_user_id, :string, null: false

      timestamps(type: :utc_datetime)
    end

    create unique_index(:social_connections, [:provider, :provider_user_id])
    create index(:social_connections, [:user_id])
  end
end
