class CreateRewards < ActiveRecord::Migration[7.1]
  def change
    create_table :rewards do |t|
      t.string :title
      t.string :description
      t.string :image
      t.string :target_grade
      t.integer :price
      t.boolean :available
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
