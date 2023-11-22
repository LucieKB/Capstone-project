class ChangeWalletType < ActiveRecord::Migration[7.1]
  def change
    change_column :users, :wallet, :float
  end
end
