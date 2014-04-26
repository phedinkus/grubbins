class IngredientsController < ApplicationController
	respond_to :json

		def index
	  respond_with Ingredient.includes(:recipe)
	end

	def show
	  respond_with Ingredient.find(params[:id])
	end

	def create
		recipe = Recipe.find_or_create_by(url: recipe_params[:url]) do |recipe|
			recipe.title = recipe_params[:title]
		end
		ingredient = Ingredient.create(ingredient_params)
		ingredient.recipe = recipe
		ingredient.save
	  respond_with ingredient
	end

	def update
	  respond_with Ingredient.update(params[:id], ingredient_params)
	end

	def destroy
	  respond_with Ingredient.destroy(params[:id])
	end

	private
	def recipe_params
		params.require(:recipe).permit(:title, :url)
	end

	def ingredient_params
		params.require(:ingredient).permit(:content, :quantity, :measurement, :original_content, :container, :prep_method)
	end
end
