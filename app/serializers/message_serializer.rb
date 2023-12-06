class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :recipient, :user_id, :goal_id, :sender, :read
  belongs_to :goal
end
