class AvatarSerializer < ActiveModel::Serializer
  attributes :id, :head, :ears, :eyes, :eyebrows, :nose, :mouth, :hair, :accessories, :student_id
end
