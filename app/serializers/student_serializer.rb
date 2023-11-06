class StudentSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :avatar, :grade, :school, :wallet, :parent_id, :educator_id, :type
  belongs_to :parent
end
