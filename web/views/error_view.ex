defmodule NollningScore.ErrorView do
  use NollningScore.Web, :view

  def render("error.json", %{:message => message}) do
    %{error: message}
  end

  # In case no render clause matches or no
  # template is found, let's render it as 500
  def template_not_found(_template, assigns) do
    render "error.json", message: "Internal Server Error"
  end

end
