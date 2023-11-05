class ChangeEducatorsIdName < ActiveRecord::Migration[7.1]
  def change
    rename_column(:users, :educators_id, :educator_id)
  end
end
