defmodule RoommateApi.Repo.Migrations.CreateReviews do
  use Ecto.Migration

  def change do
    create table(:reviews, primary_key: false) do
      add :id, :uuid, primary_key: true, default: fragment("uuid_generate_v4()")
      add :reviewer_user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :reviewee_user_id, references(:users, type: :uuid, on_delete: :delete_all), null: false
      add :matched_pair_id, references(:matched_pairs, type: :uuid, on_delete: :delete_all)
      add :cleanliness_rating, :integer
      add :communication_rating, :integer
      add :rule_compliance_rating, :integer
      add :financial_reliability_rating, :integer
      add :overall_rating, :integer
      add :positive_comment, :text
      add :improvement_comment, :text
      add :advice_for_next, :text
      add :visibility, :string, default: "public"

      timestamps(type: :utc_datetime)
    end

    create index(:reviews, [:reviewer_user_id])
    create index(:reviews, [:reviewee_user_id])
    create index(:reviews, [:matched_pair_id])
  end
end
