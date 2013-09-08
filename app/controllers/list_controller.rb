class ListController < ApplicationController
  def index
  	raw_ingredients = params["ingredients"].split("/n") || []
  	@ingredients = parse_ingredients(raw_ingredients)
  end

  private 

  def parse_ingredients(raw_ingredients)
  	raw_ingredients.map do |i| 
  		parsed = Ingreedy.parse i
  		{ content: parsed.ingredient, quantity: parsed.amount, measurement: parsed.unit }
		end 
  end

  def relevant
  	
  end
end
