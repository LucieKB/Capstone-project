class AdultuserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :user_type
end
