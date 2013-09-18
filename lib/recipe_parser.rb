require "open-uri"

module RecipeParser
  class << self
    def parse_site(recipe_url)
      url = URI recipe_url
      doc = Nokogiri::HTML(open(url.to_s))
      case url.host
      when "www.paleoplan.com"
        raw_ingredients = doc.css("#ingredients ul").children.map { |li| li.text }
        parse_ingredients raw_ingredients
      when "www.epicurious.com"
        raw_ingredients = doc.css(".ingredient").map { |li| li.text }
        parse_ingredients raw_ingredients
      end
    end

    def parse_ingredients(raw_ingredients)
      raw_ingredients.map do |i|
        parsed = Ingreedy.parse i
        { content: parsed.ingredient, quantity: parsed.amount == 0 ? nil : parsed.amount, measurement: parsed.unit }
      end
    end
  end
end