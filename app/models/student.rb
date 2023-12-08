class Student < User

    belongs_to :parent
    # belongs_to :educator
    
    validates :school, presence:true
    validates :grade, presence:true
end
