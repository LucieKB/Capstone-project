class AddBusinessColumnToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :business, :string
  end
end
