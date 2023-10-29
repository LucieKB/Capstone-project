class Student < ApplicationRecord
  has_secure_password
  
  belongs_to :adultusers
  has_many :goals
  has_many :messages, through: :goals

    has_many :students
    has_many :goals, through: :students

    validates :username, presence:true, uniqueness:true
    validates :email, presence:true, format: { with /\A(\S+)@(.+)\.(\S+)\z/, message "Your email address is invalid."}
    validates :user_type, presence:true

    PASSWORD_REQUIREMENTS = /\A 
    (?=.{6,10}) 
    (?=.*\d)
    (?=.*[A-Z])
    (?=.*[[:^alnum:]])
    /x

    validates :password, format: PASSWORD_REQUIREMENTS

end
