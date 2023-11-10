class ChangeGoalsIdInMessageTable < ActiveRecord::Migration[7.1]
  def change
    rename_column(:messages, :goals_id, :goal_id)
  end
end
