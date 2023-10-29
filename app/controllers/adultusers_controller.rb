class AdultusersController < ApplicationController
    skip_before_action :authorize, only: :create

    def show
        adultuser = Adultuser.find_by(id: session[:user_id])
        if adultuser
            render json: adultuser
        else
            render json: {errors: "Not authorized"}, status: :unauthorized
        end
    end

    def create
        adultuser = Adultuser.create!(adultuser_params)
        session[:adultuser_id] = adultuser.id
        render json: adultuser, status: :date_created
    end

    private

    def adultuser_params
        params.permit(:username, :password, :password_confirmation, :email, :user_type)
    end

    def render_not_found_response
        render json: "User not found.", status: :not_found 
    end
end
