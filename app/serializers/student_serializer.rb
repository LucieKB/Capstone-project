class StudentSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :avatar, :grade, :school, :wallet
  
end
