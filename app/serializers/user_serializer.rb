class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :type, :avatar, :grade, :school, :wallet, :business
end
