class CreateGoals < ActiveRecord::Migration[7.1]
  def change
    create_table :goals do |t|
      t.string :title
      t.text :description
      t.date :date_created
      t.date :deadline
      t.boolean :achieved
      t.integer :value

      t.timestamps
    end
  end
end
