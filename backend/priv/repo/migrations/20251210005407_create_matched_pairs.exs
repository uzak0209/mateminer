defmodule RoommateApi.Repo.Migrations.CreateMatchedPairs do
  use Ecto.Migration

  def change do
    create table(:matched_pairs, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :user1_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :user2_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :match_request_id, references(:match_requests, type: :uuid, on_delete: :nilify_all)
      add :status, :string, default: "active"
      add :matched_at, :utc_datetime
      add :dissolved_at, :utc_datetime

      timestamps(type: :utc_datetime)
    end

    create index(:matched_pairs, [:user1_id])
    create index(:matched_pairs, [:user2_id])
    create index(:matched_pairs, [:status])
  end
end
