class AddColumnsToReward < ActiveRecord::Migration[7.1]
  def change
    add_column(:rewards, :collected, :boolean)
    add_column(:rewards, :buyer, :integer)
  end
end
