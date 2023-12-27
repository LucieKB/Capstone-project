class EducatorsController < UsersController

    validates :username, presence:true
    validates :username, uniqueness:true
    validates :type, presence:true
    validates :email, presence:true, format: { with: /\A[^@\s]+@([^@.\s]+\.)+[^@.\s]+\z/ }

    def my_contacts
        my_kidObj = User.all.find_by(id: params[:student_id])
        my_parentId = my_kidObj.educator_id
        my_parentObj = User.all.find_by(id: my_parentId)
        my_kid=my_kidObj.username
        my_parent=my_parentObj.username
        my_contacts = ["", my_kid, my_parent]
        render json: my_contacts, status: :ok
    end

    def students_per_grade
        students = @current_user.students
        grade = params[:grade].to_i
        my_students = students.filter{|s| s.grade === grade}
        render json: my_students, status: :ok
    end

end
