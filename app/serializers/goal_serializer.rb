class GoalSerializer < ActiveModel::Serializer
  attributes :id, :goal_category, :title, :description, :user_id, :goal_date, :achieved, :value, :created_at
  
  belongs_to :user
  has_many :messages
end
