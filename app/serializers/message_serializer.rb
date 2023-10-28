class MessageSerializer < ActiveModel::Serializer
  attributes :id, :message_text, :message_status
  has_one :goals
end
