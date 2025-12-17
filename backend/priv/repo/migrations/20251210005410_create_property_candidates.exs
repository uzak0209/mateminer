defmodule RoommateApi.Repo.Migrations.CreatePropertyCandidates do
  use Ecto.Migration

  def change do
    create table(:property_candidates, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :matched_pair_id, references(:matched_pairs, type: :uuid, on_delete: :delete_all), null: false
      add :source_url, :string
      add :title, :string
      add :address, :text
      add :rent, :decimal
      add :initial_cost, :decimal
      add :room_type, :string
      add :building_age, :integer
      add :station_name, :string
      add :station_walk_minutes, :integer
      add :image_urls, {:array, :string}
      add :description, :text
      add :user1_rating, :integer
      add :user2_rating, :integer
      add :user1_comment, :text
      add :user2_comment, :text
      add :status, :string, default: "candidate"

      timestamps(type: :utc_datetime)
    end

    create index(:property_candidates, [:matched_pair_id])
    create index(:property_candidates, [:status])
  end
end
