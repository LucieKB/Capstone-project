class Parent < User
    has_many :students, dependent: :destroy  
end
