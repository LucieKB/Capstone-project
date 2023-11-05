class UsersController < ApplicationController
    skip_before_action :authorized

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

        # @user = User.new(user_params)
        # session[:user_id] = @user.id
        # if @user.save && @user.type == "Student" || @user.save && @user.type == "BusinessOwner"
        #     render json: @user, status: :created
        # else respond_to do |format|
        #         if @user.save && @user.type == "Parent"
        #             UserMailer.with(user: @user).Parent_signup_email.deliver_later
        #             format.json {render json: @user, status: :created, location: @user }
        #         elsif @user.save && @user.type == "Educator"
        #             UserMailer.with(user: @user).Educator_signup_email.deliver_later
        #             format.json {render json: @user, status: :created, location: @user }
        #         else
        #             format.json {render json: @user.errors, status: :unprocessable_entity}
        #         end
        #     end
        # end  
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :email, :type, :avatar, :grade, :school, :wallet, :parents_id, :educators_id)
    end

    def render_not_found_response
        render json: "User not found.", status: :not_found 
    end

end


