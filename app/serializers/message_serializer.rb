class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :recipient, :user_id, :goal_id, :sender
  belongs_to :goal
end
