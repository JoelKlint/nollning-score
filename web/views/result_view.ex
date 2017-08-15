defmodule NollningScore.ResultView do
    use NollningScore.Web, :view

    def render("user_contribution.json", %{results: results}) do
      %{
        type: :contributions,
        data: render_many(results, NollningScore.ResultView, "result.json")
      }
    end

    def render("show.json", %{results: results}) do
      %{
        type: :results,
        data: render_many(results, NollningScore.ResultView, "result.json")
      }
    end

    def render("result.json", %{result: result}) do
      # Create synthetic id
      id = "#{result.event.id}00#{result.guild.id}" |> String.to_integer()
      result = result |> Map.put(:id, id)

      # Define own parameters to keep
      base = [:id, :result]

      NollningScore.Support.View.render_object(result, base)

    end

end
