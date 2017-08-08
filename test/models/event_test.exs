defmodule NollningScore.EventTest do
  use NollningScore.ModelCase

  alias NollningScore.Event

  @valid_attrs Factory.params_for(:event)
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Event.changeset(%Event{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Event.changeset(%Event{}, @invalid_attrs)
    refute changeset.valid?
  end
end
