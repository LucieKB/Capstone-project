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
        byebug
        value = goal.value
        student.wallet += value/2
        student.update!(payment_params)
        render json: goal, status: :accepted
    end

    private

    def student_params
        params.permit(:username, :password, :password_confirmation, :email, :type, :avatar, :grade, :school, :wallet, :parent_id, :educator_id)
    end

    def payment_params
        params.permit(:goals, :wallet)
    end

    def render_not_found_response
        render json: "Student not found.", status: :not_found 
    end

end

