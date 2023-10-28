class CreateMessages < ActiveRecord::Migration[7.1]
  def change
    create_table :messages do |t|
      t.string :message_text
      t.string :message_status
      t.belongs_to :goals, null: false, foreign_key: true

      t.timestamps
    end
  end
end
