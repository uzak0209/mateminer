defmodule RoommateApi.Repo.Migrations.CreateChatRoomMembers do
  use Ecto.Migration

  def change do
    create table(:chat_room_members, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :chat_room_id, references(:chat_rooms, type: :uuid, on_delete: :delete_all), null: false
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :role, :string, default: "member"  # member, admin
      add :last_read_at, :utc_datetime
      add :notifications_enabled, :boolean, default: true
      add :joined_at, :utc_datetime
      add :left_at, :utc_datetime

      timestamps(type: :utc_datetime)
    end

    create unique_index(:chat_room_members, [:chat_room_id, :user_id])
    create index(:chat_room_members, [:chat_room_id])
    create index(:chat_room_members, [:user_id])
  end
end
