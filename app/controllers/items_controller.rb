class ItemsController < ApplicationController
	def index
		@items = Items.all
		respond_with @items
	end

	def create
		@item = Item.create(params[:item])
	end

	private

	def item_params
		params.require(:item).permit(:content, :quantity, :measurement)
	end
end
