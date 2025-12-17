defmodule RoommateApi.Repo.Migrations.CreatePairPreferences do
  use Ecto.Migration

  def change do
    create table(:pair_preferences, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :matched_pair_id, references(:matched_pairs, type: :uuid, on_delete: :delete_all), null: false
      add :agreed_min_rent, :decimal
      add :agreed_max_rent, :decimal
      add :agreed_max_initial_cost, :decimal
      add :agreed_areas, {:array, :string}
      add :agreed_stations, {:array, :string}
      add :agreed_room_types, {:array, :string}
      add :priority_order, {:array, :string}

      timestamps(type: :utc_datetime)
    end

    create unique_index(:pair_preferences, [:matched_pair_id])
  end
end
