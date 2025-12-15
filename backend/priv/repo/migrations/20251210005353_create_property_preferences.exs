defmodule RoommateApi.Repo.Migrations.CreatePropertyPreferences do
  use Ecto.Migration

  def change do
    create table(:property_preferences, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :min_rent, :decimal
      add :max_rent, :decimal
      add :max_initial_cost, :decimal
      add :preferred_prefectures, {:array, :string}
      add :preferred_cities, {:array, :string}
      add :preferred_stations, {:array, :string}
      add :max_commute_time, :integer
      add :room_types, {:array, :string}
      add :min_building_age, :integer
      add :max_building_age, :integer
      add :requires_auto_lock, :boolean, default: false
      add :requires_separate_bath_toilet, :boolean, default: false
      add :requires_south_facing, :boolean, default: false
      add :other_requirements, :text
      add :move_in_timing, :string

      timestamps(type: :utc_datetime)
    end

    create unique_index(:property_preferences, [:user_id])
  end
end
