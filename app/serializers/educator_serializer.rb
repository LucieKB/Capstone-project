class EducatorSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :type, :students, :students_per_grades, :goals
  has_many :students
end
