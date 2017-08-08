defmodule NollningScore.Factory do
    use ExMachina.Ecto, repo: NollningScore.Repo

    def event_factory do
        %NollningScore.Event{
            name: sequence("Test Event")
        }
    end

    def category_factory do
        %NollningScore.Category{
            name: sequence("Test Category"),
            min: -10,
            max: 10,
            event: build(:event)
        }
    end

    def score_factory do
        %NollningScore.Score{
            value: 5,
            category: build(:category),
            guild: build(:guild)
        }
    end

    def guild_factory do
        %NollningScore.Guild{
            name: sequence("Test Guild")
        }
    end

end