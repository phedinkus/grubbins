require 'open-uri'
class ListController < ApplicationController
  def index
    url = params[:recipe_page_url]
    doc = Nokogiri::HTML(open(url))

    # For paleoplan.com
  	raw_ingredients = doc.css("#ingredients ul").children.map { |li| li.text }
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
