defmodule NollningScore.CategoryTest do
  use NollningScore.ModelCase

  alias NollningScore.Category

  test "changeset with valid attributes" do
    valid_attrs = Factory.params_with_assocs(:category)
    changeset = Category.changeset(%Category{}, valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    invalid_attrs = %{}
    changeset = Category.changeset(%Category{}, invalid_attrs)
    refute changeset.valid?
  end
end
