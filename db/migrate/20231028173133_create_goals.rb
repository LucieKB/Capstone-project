class CreateGoals < ActiveRecord::Migration[7.1]
  def change
    create_table :goals do |t|
      t.string :title
      t.text :description
      t.date :date_created
      t.date :goal_date
      t.boolean :achieved
      t.integer :value
      t.belongs_to :students, null: false, foreign_key: true

      t.timestamps
    end
  end
end
