class ChangeColumnNameInRewards < ActiveRecord::Migration[7.1]
  def change
    rename_column(:rewards, :target_grade, :pickup_place)
  end
end
