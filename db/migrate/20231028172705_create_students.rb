class CreateStudents < ActiveRecord::Migration[7.1]
  def change
    create_table :students do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :avatar
      t.integer :grade
      t.string :school
      t.integer :wallet
      t.belongs_to :adultusers, null: false, foreign_key: true

      t.timestamps
    end
  end
end
