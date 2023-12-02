class StudentsController < UsersController

    def index
        students = Student.all
        render json: students, status: :ok
    end

    def show
        student = Student.find_by(id: params[:id])
        render json: student, status: :ok
    end

    def create
        student = Student.create!(student_params)
        session[:user_id] = student.id
        render json:student, status: :created
    end

    def update
        student = Student.find_by(id: params[:id])
        student.update!(student_params)
        render json: student, status: :accepted
    end

    def update_payment
        student = Student.find_by(id: params[:student_id])
        goal = student.goals.find_by(id: params[:id])
        goal.update!(goal_params)
        value = goal.value
        student.wallet += value/2.0
        student.update!(payment_params)
        render json: goal, status: :accepted
    end

    def my_adults
        my_parent = @current_user.parent.username
        my_educator = @current_user.educator.username
        my_adults = ["", my_parent, my_educator]
        render json: my_adults, status: :ok
    end

    private

    def student_params
        params.permit(:id, :username, :password, :password_confirmation, :email, :type, :avatar, :grade, :school, :wallet, :parent_id, :educator_id, :student_id)
    end

    def payment_params
        params.permit(:goals, :wallet)
    end

    def goal_params
        params.permit(:id, :achieved_by_educator, :achieved_by_parent)
    end

    def render_not_found_response
        render json: "Student not found.", status: :not_found 
    end

end

