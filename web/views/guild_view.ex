defmodule NollningScore.GuildView do
  use NollningScore.Web, :view

  def render("index.json", %{guilds: guilds}) do
    %{data: render_many(guilds, NollningScore.GuildView, "guild.json")}
  end

  def render("show.json", %{guild: guild}) do
    %{data: render_one(guild, NollningScore.GuildView, "guild.json")}
  end

  def render("guild.json", %{guild: guild}) do
    # Define own parameters to keep
    base = [:id, :name, :color]

    NollningScore.Support.View.render_object(guild, base)
  end
end
