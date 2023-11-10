class AddAchievedByParentByEducatorToGoals < ActiveRecord::Migration[7.1]
  def change
    add_column :goals, :achieved_by_parent, :boolean
    add_column :goals, :achieved_by_educator, :boolean
  end
end
