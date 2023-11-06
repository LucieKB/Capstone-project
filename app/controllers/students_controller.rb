class StudentsController < UsersController

    def index
        students = Student.all
        render json: students, status: :ok
    end

    def show
        student = Student.find_by(id: params[:id])
        render json: student, status: :ok

    def create
        student = Student.create!(student_params)
        session[:user_id] = student.id
        render json:student, status: :created
    end

    private

    def student_params
        params.permit(:username, :password, :password_confirmation, :email, :type, :avatar, :grade, :school, :wallet, :parent_id, :educator_id)
    end

    def render_not_found_response
        render json: "Student not found.", status: :not_found 
    end

end

