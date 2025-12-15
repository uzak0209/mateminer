defmodule RoommateApi.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :sender_user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :receiver_user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :matched_pair_id, references(:matched_pairs, type: :uuid, on_delete: :delete_all)
      add :content, :text, null: false
      add :message_type, :string, default: "text"  # text, image, file, system
      add :attachment_url, :string
      add :attachment_type, :string  # image/jpeg, application/pdf, etc.
      add :attachment_size, :integer  # bytes
      add :is_flagged, :boolean, default: false
      add :is_deleted, :boolean, default: false
      add :deleted_at, :utc_datetime
      add :read_at, :utc_datetime
      add :delivered_at, :utc_datetime
      add :reply_to_message_id, references(:messages, type: :uuid, on_delete: :nilify_all)

      timestamps(type: :utc_datetime)
    end

    create index(:messages, [:sender_user_id])
    create index(:messages, [:receiver_user_id])
    create index(:messages, [:matched_pair_id])
    create index(:messages, [:inserted_at])
    create index(:messages, [:reply_to_message_id])
  end
end
