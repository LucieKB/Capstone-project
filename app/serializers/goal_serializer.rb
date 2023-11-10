class GoalSerializer < ActiveModel::Serializer
  attributes :id, :goal_category, :title, :description, :user_id, :deadline, :achieved, :value, :created_at, :validated_by_educator, :validated_by_parent
  
  belongs_to :user
  has_many :messages
end
