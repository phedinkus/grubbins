class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :content
      t.integer :quantity
      t.string :measurement

      t.timestamps
    end
  end
end
