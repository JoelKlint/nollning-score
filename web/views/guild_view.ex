defmodule NollningScore.GuildView do
  use NollningScore.Web, :view

  def render("index.json", %{guilds: guilds}) do
    %{data: render_many(guilds, NollningScore.GuildView, "guild.json")}
  end

  def render("show.json", %{guild: guild}) do
    %{data: render_one(guild, NollningScore.GuildView, "guild.json")}
  end

  def render("guild.json", %{guild: guild}) do
    %{
      id: guild.id,
      name: guild.name,
      color: guild.color
    }
  end
end
