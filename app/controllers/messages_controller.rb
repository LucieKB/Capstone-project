class MessagesController < ApplicationController

    wrap_parameters format:[]
    skip_before_action :authorized, only: :show
   

    def index
        if params[:user_id]
            user = User.find(params[:user_id])
            messages = user.messages
        else
        messages = Message.all
        end
        render json: messages, status: :ok
    end

    def show
        message = Message.all.find_by(id: params[:id])
        render json: message
    end

    def create
        goal = Goal.find_by(id: params[:goal_id])
        message = goal.messages.create!(message_params)
        render json: message, status: :created
    end

    def update
        message = Message.find_by(id: params[:id])
        message.update!(message_params)
        render json: message, status: :accepted
    end

    def destroy
        message = @current_user.messages.find_by(id: params[:id])
        message.delete
        head :no_content
    end

    def set_read
        goal = params[:goal_id]
        messages = Message.all.filter{|m| m.goal_id == goal.to_i}
        messages.last.update!(message_params)
        render json: messages, status: :accepted
    end



    private


    def message_params
        params.permit(:id, :content, :recipient, :user_id, :goal_id, :read)
    end

    def render_not_found_response
        render json: "Message not found.", status: :not_found 
    end

end



