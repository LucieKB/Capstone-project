class Goal < ApplicationRecord
  belongs_to :user
  has_many :messages

  validates :title, presence:true
  validates :description, presence:true, length: {in: 20..200}
  validates :deadline, presence:true
  validates :value, presence:true, numericality: {in: 1..5}
end
