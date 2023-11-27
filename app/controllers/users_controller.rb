class UsersController < ApplicationController
    skip_before_action :authorized, only: :create

    def index
        users = User.all
        render json: users, status: :ok
    end

    def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user
        else 
            render json: {errors: "Not authorized"}, status: :unauthorized
        end
    end

    def create
        
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created

    end

    def user_and_goals
        user = User.find_by(id: params[:id])
        if user.type == "Student"
            goals = user.goals
        elsif user.type == "Parent" || user.type == "Educator"
            students = user.students
            goals = students.map {|s| s.goals}
        end 
        render json: goals, status: :ok
    end

    # def only_my_student
    #     user = User.find_by(id: session[:user_id])
    #     byebug
    #     if user.students.count > 0
    #         students = user.students.map{|s| [s.username, s.goals]}.to_h
    #         render json: students, status: :ok
    #     end
    # end


    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email, :type, :avatar, :grade, :school, :wallet, :parents_id, :educators_id)
    end

    def render_not_found_response
        render json: "User not found.", status: :not_found 
    end

end


