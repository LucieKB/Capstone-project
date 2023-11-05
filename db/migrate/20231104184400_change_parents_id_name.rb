class ChangeParentsIdName < ActiveRecord::Migration[7.1]
  def change
    rename_column(:users, :parents_id, :parent_id)
  end
end
