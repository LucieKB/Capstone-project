class AddSelfJoinToUsers < ActiveRecord::Migration[7.1]
  def change
    add_reference :users, :parents, foreign_key: {to_table: :users}
    add_reference :users, :educators, foreign_key: {to_table: :users}
  end
end
