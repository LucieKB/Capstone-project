class EducatorSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :password_digest, :type, :students, :students_per_grades
  has_many :students
end
