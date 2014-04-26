require "open-uri"

class RecipeParser
  attr_reader :ingredients, :title, :html_dom, :url, :uri

  def initialize(recipe_url)
    @url = recipe_url
    @uri = URI.parse recipe_url
    @html_dom = get_html
    @title = parse_title
    @ingredients = parse_ingredients
  end


  def get_html
    Nokogiri::HTML(open(uri.to_s).read, nil, 'utf-8')
  end

  def parse_title
    self.html_dom.css("title").text || "Unknown Title"
  end

  def parse_ingredients
    case self.uri.host
    when "www.paleoplan.com"
      raw_ingredients = self.html_dom.css("#ingredients ul li").map { |li| li.text }
    when "www.epicurious.com"
      raw_ingredients = self.html_dom.css(".ingredient").map { |li| li.text }
    end
    raw_ingredients.map do |i|
      parsed = Ingreedy.parse i

      unless parsed.ingredient.empty?
        {
          ingredient_string: parsed.query,
          content:      parsed.ingredient,
          quantity:     parsed.amount == 0 ? nil : parsed.amount,
          measurement:  parsed.unit,
          recipe:       { url: self.url, title: self.title }
        }
      end
    end
  end
end
