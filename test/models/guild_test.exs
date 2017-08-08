defmodule NollningScore.GuildTest do
  use NollningScore.ModelCase

  alias NollningScore.Guild

  @valid_attrs Factory.params_for(:guild)
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Guild.changeset(%Guild{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Guild.changeset(%Guild{}, @invalid_attrs)
    refute changeset.valid?
  end
end
