class DropAvatarTable < ActiveRecord::Migration[7.1]
  def change
    drop_table(:avatars)
  end
end
