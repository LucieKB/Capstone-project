class GoalSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :date_created, :goal_date, :achieved, :value
  has_one :students
  has_one :adultusers
end
