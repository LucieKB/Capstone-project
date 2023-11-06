class AddCategoryToGoal < ActiveRecord::Migration[7.1]
  def change
    add_column :goals, :goal_category, :string
  end
end
