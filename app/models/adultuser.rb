class Adultuser < ApplicationRecord
    has_secure_password

    has_many :students
    has_many :goals, through: :students
    has_many :messages, through: :goals

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
