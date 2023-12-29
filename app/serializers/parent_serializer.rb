class ParentSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :type, :number_of_children, :goals
  has_many :students
end
