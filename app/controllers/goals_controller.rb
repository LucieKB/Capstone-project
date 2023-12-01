class GoalsController < ApplicationController
    wrap_parameters format: []

    def index
        user = User.find_by(id: session[:user_id])
        if user
            case user.type
                when "Parent"
                 students = user.students
                 goalsArr = students.map {|s| s.goals}
                 goals = goalsArr.flatten
             when "Educator"
                 students = user.students
                 goalsArr = students.map {|s| s.goals}
                 goals = goalsArr.flatten
             when "Student"
                 goals = user.goals
             else
                 "Error : there are no goals to display"
             end
        else
            goals = Goal.all
            
        end
        render json: goals, status: :ok
    end

    def show
        goal = Goal.all.find_by(id: params[:id])
        render json: goal
    end
    
    def create
        goal = @current_user.goals.create(goal_params)
        render json: goal, status: :created
    end

    def update
        # student = Student.find_by(id: params[:student_id])
        goal = Goal.find_by(id: params[:id])
        goal.update!(goal_params)
        render json: goal, status: :accepted
    end

    

    
    

    private

    def goal_params
        params.permit(:id, :goal_category, :title, :created_at, :description, :user_id, :deadline, :achieved, :value, :validated_by_educator, :validated_by_parent, :achieved_by_educator, :achieved_by_parent, :messages)
    end


    def render_not_found_response
        render json: "Goal not found", status: :not_found
    end
            
end
