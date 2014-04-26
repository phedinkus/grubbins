# == Schema Information
#
# Table name: recipes
#
#  id         :integer          not null, primary key
#  url        :string(255)
#  title      :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Recipe < ActiveRecord::Base
  has_many :ingredients
end
