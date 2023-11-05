class ParentSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :type
  has_many :students
end
