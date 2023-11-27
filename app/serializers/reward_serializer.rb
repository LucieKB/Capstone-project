class RewardSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :image, :target_grade, :price, :available
  has_one :user
end
