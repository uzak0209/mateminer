defmodule RoommateApi.Repo do
  use Ecto.Repo,
    otp_app: :roommate_api,
    adapter: Ecto.Adapters.Postgres
end
