class RemoveDateCreatedFromGoals < ActiveRecord::Migration[7.1]
  def change
    remove_column :goals, :date_created, :date
  end
end
