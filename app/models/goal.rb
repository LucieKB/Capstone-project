class Goal < ApplicationRecord
  belongs_to :students
  belongs_to :adultusers
  has_many: messages

  validates :title, presence:true
  validates :description, presence:true, length: {in: 20..200} #adapt if needed
  validates :goal_date, presence:true
  #custom method validate date + 1 month
  validates :value, presence:true, numericality: {in: 1..4}
end
