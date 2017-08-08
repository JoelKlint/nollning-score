defmodule NollningScore.ScoreTest do
  use NollningScore.ModelCase

  alias NollningScore.Score

  test "changeset with valid attributes" do
    valid_attrs = Factory.params_with_assocs(:score)
    changeset = Score.changeset(%Score{}, valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    invalid_attrs = %{}
    changeset = Score.changeset(%Score{}, invalid_attrs)
    refute changeset.valid?
  end
end
