class Goal < ApplicationRecord
  belongs_to :student

  validates :title, presence:true
  validates :description, presence:true, length: {in: 20..200}
  validates :goal_date, presence:true
  validates :value, presence:true, numericality: {in: 1..5}
end
