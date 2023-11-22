class EducatorSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :type, :students
  has_many :students
end
