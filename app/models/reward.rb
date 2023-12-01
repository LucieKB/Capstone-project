class Reward < ApplicationRecord
  belongs_to :user

  validates :title, presence:true
  validates :description, presence:true, length: {in: 10..100}
  validates :image, presence:true
  validates :price, presence:true, numericality: {in: 1..20}
end
