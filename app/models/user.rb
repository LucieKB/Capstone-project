class User < ApplicationRecord
    has_secure_password

    validates :username, presence:true
    validates :username, uniqueness:true
    validates :type, presence:true
    validates :email, presence:true, format: { with: /\A[^@\s]+@([^@.\s]+\.)+[^@.\s]+\z/ }

    # PASSWORD_REQUIREMENTS = /\A 
    # (?=.{6,10}) 
    # (?=.*\d)
    # (?=.*[A-Z])
    # (?=.*[[:^alnum:]])
    # /x

    # validates :password, format: PASSWORD_REQUIREMENTS

    has_many :students, class_name: "User", foreign_key: "parent_id"
    has_many :students, class_name: "User", foreign_key: "educator_id"
    has_many :goals
    has_many :rewards

    belongs_to :parent, class_name: "User", optional: true
    belongs_to :educator, class_name: "User", optional: true

end
