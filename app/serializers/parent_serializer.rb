class ParentSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :type, :students, :number_of_children
  has_many :students
end
