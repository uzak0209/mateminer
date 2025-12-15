defmodule RoommateApi.Repo.Migrations.CreateMatchRequests do
  use Ecto.Migration

  def change do
    create table(:match_requests, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :sender_user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :receiver_user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :status, :string, default: "pending"
      add :message, :text
      add :compatibility_score, :integer
      add :expires_at, :utc_datetime

      timestamps(type: :utc_datetime)
    end

    create index(:match_requests, [:sender_user_id])
    create index(:match_requests, [:receiver_user_id])
    create index(:match_requests, [:status])
  end
end
