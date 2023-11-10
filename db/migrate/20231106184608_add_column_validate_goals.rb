class AddColumnValidateGoals < ActiveRecord::Migration[7.1]
  def change
    add_column :goals, :validated_by_parent, :boolean
    add_column :goals, :validated_by_educator, :boolean
  end
end
