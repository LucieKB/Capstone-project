class Message < ApplicationRecord
  belongs_to :user
  belongs_to :goal

  def sender
    user_id = self.user_id
    user = User.all.filter{|u| u.id == user_id}
    user[0].username
  end

end
