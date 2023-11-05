class EducatorSerializer < User
  attributes :id, :username, :email, :password_digest, :type
end
