class RemoveMessagesFromGoals < ActiveRecord::Migration[7.1]
  def change
    remove_column :goals, :messages, :text
  end
end
