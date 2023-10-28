class Adultuser < ApplicationRecord

    validates :username, presence:true, uniqueness:true
    validates :email, presence:true, format: { with /\A(\S+)@(.+)\.(\S+)\z/, message "Your email address is invalid."}
    
end
