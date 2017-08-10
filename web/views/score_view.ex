defmodule NollningScore.ScoreView do
  use NollningScore.Web, :view

  def render("index.json", %{score: score}) do
    %{data: render_many(score, NollningScore.ScoreView, "score.json")}
  end

  def render("show.json", %{score: score}) do
    %{data: render_one(score, NollningScore.ScoreView, "score.json")}
  end

  def render("score.json", %{score: score}) do
    # Define own parameters to keep
    base = [:id, :value]

    NollningScore.Support.View.render_object(score, base)
  end
end
