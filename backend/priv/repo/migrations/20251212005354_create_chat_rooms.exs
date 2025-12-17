defmodule RoommateApi.Repo.Migrations.CreateChatRooms do
  use Ecto.Migration

  def change do
    create table(:chat_rooms, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :name, :string
      add :room_type, :string, default: "direct"  # direct, group, match_pair
      add :matched_pair_id, references(:matched_pairs, type: :uuid, on_delete: :delete_all)
      add :last_message_at, :utc_datetime
      add :is_archived, :boolean, default: false

      timestamps(type: :utc_datetime)
    end

    create index(:chat_rooms, [:matched_pair_id])
    create index(:chat_rooms, [:room_type])
    create index(:chat_rooms, [:last_message_at])
  end
end
