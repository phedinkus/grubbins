require 'recipe_parser'

class ListController < ApplicationController
  def index
  	recipe = RecipeParser.new(params[:recipe_page_url])
  	@ingredients = recipe.ingredients
  end
end
