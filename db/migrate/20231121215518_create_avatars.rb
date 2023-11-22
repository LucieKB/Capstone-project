class CreateAvatars < ActiveRecord::Migration[7.1]
  def change
    create_table :avatars do |t|
      t.string :head
      t.string :ears
      t.string :eyes
      t.string :eyebrows
      t.string :nose
      t.string :mouth
      t.string :hair
      t.string :accessories
      t.integer :student_id

      t.timestamps
    end
  end
end
