class AddMessagesToGoal < ActiveRecord::Migration[7.1]
  def change
    add_column :goals, :messages, :text, array:true, default:[]
  end
end
