defmodule NollningScore.ResultView do
    use NollningScore.Web, :view

    def render("show.json", %{results: results}) do
        %{data: render_many(results, NollningScore.ResultView, "result.json")}
    end

    def render("result.json", %{result: result}) do

        params = [:guild, :event, :result]

        id = "#{result.event.id}#{result.guild.id}" |> String.to_integer()

        result 
        |> Map.take(params)
        |> Map.update!(:guild, &render_one(&1, NollningScore.GuildView, "guild.json", relations: []))
        |> Map.update!(:event, &render_one(&1, NollningScore.EventView, "event.json", relations: []))
        |> Map.put(:id, id)

    end

end