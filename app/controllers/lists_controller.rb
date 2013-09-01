class ListsController < ApplicationController
	def index
		raw_ingredients = params["ingredients"].split("/n") || []
		@ingredients = raw_ingredients.map { |i| Ingreedy.parse i }
	end

	# display the most recent list for the user
	def show
	end

	def create
	end

	def update
	end
end
