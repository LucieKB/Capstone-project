class AddGoalIdToMessages < ActiveRecord::Migration[7.1]
  def change
    add_reference :messages, :goal, null: false, foreign_key: true
  end
end
