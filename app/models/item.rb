class Item < ActiveRecord::Base
	belongs_to :list

	validates :quantity, presence: true
	validates :content, presence: true
end
