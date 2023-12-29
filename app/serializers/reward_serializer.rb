class RewardSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :image, :pickup_place, :price, :available, :user_id, :reward_condition, :reward_category, :buyer, :collected
  # has_one :user
end
