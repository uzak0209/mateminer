defmodule RoommateApi.Repo.Migrations.CreateTypingIndicators do
  use Ecto.Migration

  def change do
    create table(:typing_indicators, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :chat_room_id, references(:chat_rooms, type: :uuid, on_delete: :delete_all), null: false
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :is_typing, :boolean, default: true
      add :expires_at, :utc_datetime

      timestamps(type: :utc_datetime)
    end

    create unique_index(:typing_indicators, [:chat_room_id, :user_id])
    create index(:typing_indicators, [:chat_room_id])
    create index(:typing_indicators, [:expires_at])
  end
end
