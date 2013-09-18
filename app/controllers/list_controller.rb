class ListController < ApplicationController
  include RecipeParser
  def index
  	@ingredients = RecipeParser.parse_site(params[:recipe_page_url])
  end
end
