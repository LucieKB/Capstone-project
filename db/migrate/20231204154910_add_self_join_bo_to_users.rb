class AddSelfJoinBoToUsers < ActiveRecord::Migration[7.1]
  def change
    add_reference :users, :business_owners, foreign_key: {to_table: :users}
  end
end
