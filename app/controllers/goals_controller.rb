class GoalsController < ApplicationController

    def index
        if params[:user_id]
            case user.type
            when "Parent"
                students = user.students
                goals = students.map {|s| s.goals}
            when "Educator"
                students = user.students
                goals = students.map {|s| s.goals}
            when "Student"
                goals = user.goals
            else
                "Error : there are no goals to display"
            end
        else
            goals = Goal.all
        end
        render json: goals
    end

    def show
        goal = Goal.all.find_by(id: params[:id])
        render json: goal
    end
    
    def create
        goal = @current_user.goals.create!(goal_params)
        render json: goal, status: :created
    end

    def update
        student = Student.find_by(id: params[:student_id])
        goal = Goal.all.find_by(id: params[:id])
        goal.update!(goal_params)
        render json: goal, status: :accepted
    end

    private

    def goal_params
        params.permit(:id, :goal_category, :title, :description, :user_id, :deadline, :achieved, :value, :validated_by_educator, :validated_by_parent)
    end

    def render_not_found_response
        render json: "Goal not found", status: :not_found
    end
            
end
