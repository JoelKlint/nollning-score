defmodule NollningScore.ResultController do
    use NollningScore.Web, :controller

    alias NollningScore.Score
    alias NollningScore.Category
    alias NollningScore.Event
    alias NollningScore.Guild

    def show(conn, %{"event_id" => event_id}) do
        
        # Get all scores for this event
        results = from(
            s in Score,
            join: c in Category, on: s.category_id == c.id,
            join: e in Event, on: c.event_id == e.id,
            where: e.id == ^event_id,
            group_by: [s.guild_id, e.id],
            select: {s.guild_id, sum(s.value), e.id}
        )
        |> Repo.all() 
        |> Enum.map(fn {guild_id, result, event_id} -> 
            %{
                guild: Repo.get!(Guild, guild_id), 
                event: Repo.get!(Event, event_id),
                result: result
            } 
        end)

        conn |> render("show.json", results: results)

    end
end