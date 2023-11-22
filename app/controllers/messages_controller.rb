class MessagesController < ApplicationController

    def show
        message = Message.all.find_by(id: params[:id])
        render json: message, status: :ok
    end
    
    def create
        my_students = @current_user.students
        their_goals = my_students.map{|s| s.goals}.flatten
        # byebug
        goal = their_goals.select{|g| g.id == params[:goal_id].to_i}
        message = goal[0].messages.create!(message_params)
        render json: message, status: :created
    end

    private

    def message_params
        params.permit(:id, :text, :status, :goal_id)
    end

    def render_not_found_response
        render json: "Message not found", status: :not_found
    end


end
