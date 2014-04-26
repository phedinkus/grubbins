class CreateRecipes < ActiveRecord::Migration
  def change
    create_table :recipes do |t|
      t.string :url
      t.string :title

      t.timestamps
    end

    rename_table :items, :ingredients

    change_table :ingredients do |t|
      t.belongs_to :recipe
      t.string :original_content
      t.string :container
      t.string :prep_method
    end
  end
end
