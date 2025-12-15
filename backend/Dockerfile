# Build stage
FROM elixir:1.15-alpine AS build

# Install build dependencies
RUN apk add --no-cache build-base git

# Prepare build dir
WORKDIR /app

# Install hex + rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# Set build ENV
ENV MIX_ENV=dev

# Install mix dependencies
COPY mix.exs mix.lock ./
RUN mix deps.get --only $MIX_ENV

# Copy compile configuration
COPY config/config.exs config/$MIX_ENV.exs config/
RUN mix deps.compile

# Compile the project
COPY lib lib/
COPY priv priv/
RUN mix compile

# Development stage
FROM elixir:1.15-alpine

# Install runtime dependencies
RUN apk add --no-cache bash postgresql-client

# Install hex + rebar
RUN mix local.hex --force && \
    mix local.rebar --force

# Prepare app directory
WORKDIR /app

# Copy compiled build
COPY --from=build /app/_build /app/_build
COPY --from=build /app/deps /app/deps

# Copy application
COPY . .

# Set environment
ENV MIX_ENV=dev

# Expose Phoenix port
EXPOSE 4000

# Start the Phoenix server
CMD ["mix", "phx.server"]
