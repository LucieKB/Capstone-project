class ParentsController < UsersController
  

    def only_my_student
        parent = Parent.find_by(id: session[:user_id])
        if parent.students.count > 0
            students = parent.students.map{|s| [s.username, s.goals]}.to_h
            render json: students, status: :ok
        end
    end

    


end
