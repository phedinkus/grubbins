# == Schema Information
#
# Table name: ingredients
#
#  id               :integer          not null, primary key
#  content          :string(255)
#  quantity         :float
#  measurement      :string(255)
#  created_at       :datetime
#  updated_at       :datetime
#  recipe_id        :integer
#  original_content :string(255)
#  container        :string(255)
#  prep_method      :string(255)
#

class Ingredient < ActiveRecord::Base
	belongs_to :list
  belongs_to :recipe

	validates :content, presence: true

  def as_json(options = nil)
    super(include: :recipe)
    
  end
end
