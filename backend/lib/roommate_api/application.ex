defmodule RoommateApi.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      RoommateApiWeb.Telemetry,
      RoommateApi.Repo,
      {DNSCluster, query: Application.get_env(:roommate_api, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: RoommateApi.PubSub},
      # Start a worker by calling: RoommateApi.Worker.start_link(arg)
      # {RoommateApi.Worker, arg},
      # Start to serve requests, typically the last entry
      RoommateApiWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: RoommateApi.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    RoommateApiWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
