defmodule NollningScore.User do
  use NollningScore.Web, :model

  alias NollningScore.Repo

  schema "users" do
    field :username, :string
    field :hashed_password, :string
    field :password, :string, virtual: true

    timestamps()
  end

  def new_changeset(%NollningScore.User{}, params \\ %{}) do
    %NollningScore.User{}
    |> cast(params, [:username, :password])
    |> validate_required([:username, :password])
    |> unique_constraint(:email)
    |> validate_length(:password, min: 6)
    |> hash_password(params)
  end

  defp hash_password(changeset, params) do
    case Map.get(params, :password) do
      nil ->
        changeset
      password ->
        changeset
        |> put_change(:hashed_password, hash_string(password))
        |> delete_change(:password)
    end
  end

  defp hash_string(string) do
    case string do
      nil -> nil
      string -> Comeonin.Bcrypt.hashpwsalt(string)
    end
  end

  def authenticate(%{:username => username, :password => password}) do
    case Repo.get_by(NollningScore.User, username: username) do
      nil -> {:error, "No such user"}
      user ->
        case Comeonin.Bcrypt.checkpw(password, user.hashed_password) do
          true -> {:ok, user}
          false -> {:error, "Incorrect password"}
        end
    end
  end

end
