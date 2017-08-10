defmodule NollningScore.GuildView do
  use NollningScore.Web, :view

  def render("index.json", %{guilds: guilds}) do
    %{
      type: :guilds,
      data: render_many(guilds, NollningScore.GuildView, "guild.json")
    }
  end

  def render("show.json", %{guild: guild}) do
    %{
      type: :guild,
      data: render_one(guild, NollningScore.GuildView, "guild.json")
    }
  end

  def render("guild.json", %{guild: guild}) do
    # Define own parameters to keep
    base = [:id, :name, :color]

    NollningScore.Support.View.render_object(guild, base)
  end
end
