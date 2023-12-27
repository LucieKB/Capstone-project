class BusinessOwner < User
    has_many :rewards

    validates :business, presence: true
end
