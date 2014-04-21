# == Schema Information
#
# Table name: items
#
#  id          :integer          not null, primary key
#  content     :string(255)
#  quantity    :float
#  measurement :string(255)x  
#  created_at  :datetime
#  updated_at  :datetime
#

class Item < ActiveRecord::Base
	belongs_to :list

	validates :content, presence: true
end
