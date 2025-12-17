defmodule RoommateApi.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    # Enable UUID extension
    execute "CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"", "DROP EXTENSION IF EXISTS \"uuid-ossp\""

    create table(:users, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :email, :string, null: false
      add :password_hash, :string, null: false
      add :phone_number, :string
      add :phone_verified, :boolean, default: false
      add :email_verified, :boolean, default: false
      add :is_university_email, :boolean, default: false
      add :trust_score, :integer, default: 0
      add :status, :string, default: "active"
      add :last_login_at, :utc_datetime

      timestamps(type: :utc_datetime)
    end

    create unique_index(:users, [:email])
    create unique_index(:users, [:phone_number])
    create index(:users, [:status])
  end
end
