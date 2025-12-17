defmodule RoommateApi.Repo.Migrations.AddChatRoomToMessages do
  use Ecto.Migration

  def change do
    alter table(:messages) do
      add :chat_room_id, references(:chat_rooms, type: :uuid, on_delete: :delete_all)
    end

    create index(:messages, [:chat_room_id])
  end
end
