class ChangeColumnsOnRewards < ActiveRecord::Migration[7.1]
  def change
    add_column(:rewards, :reward_category, :string)
    add_column(:rewards, :reward_condition, :string)
  end
end
