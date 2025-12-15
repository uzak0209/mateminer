defmodule RoommateApi.Repo.Migrations.CreateLifestyles do
  use Ecto.Migration

  def change do
    create table(:lifestyles, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :sleep_schedule, :string
      add :cleanliness_level, :integer
      add :smoking, :boolean, default: false
      add :e_cigarette, :boolean, default: false
      add :pets, :string
      add :guest_frequency, :string
      add :noise_tolerance, :integer
      add :socializing_preference, :integer
      add :home_time, :string
      add :cooking_frequency, :string

      timestamps(type: :utc_datetime)
    end

    create unique_index(:lifestyles, [:user_id])
  end
end
