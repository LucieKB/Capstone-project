class MessageSerializer < ActiveModel::Serializer
  attributes :id, :text, :status, :goal_id
  belongs_to :goal
end
