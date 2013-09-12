class ChangeQuantityToFloat < ActiveRecord::Migration
  def change
  	change_column :items, :quantity, :float

  end
end
