class AddNumberOfChildrenToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :number_of_children, :integer
  end
end
