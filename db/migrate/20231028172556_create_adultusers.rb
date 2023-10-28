class CreateAdultusers < ActiveRecord::Migration[7.1]
  def change
    create_table :adultusers do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :user_type

      t.timestamps
    end
  end
end
