class SessionsController < ApplicationController
    skip_before_action :authorize, only: :create

    def create
        adultuser = Adultuser.find_by(username: params[:username])
        if adultuser &.authenticate(params[:password])
            session[:adultuser_id] = adultuser.id
            render json: adultuser, status: :created
        else
            render json: { errors: ["Invalid username or password"] }, status: :unauthorized
        end
    end

    def destroy
        session.destroy :adultuser_id
        head :no_content
    end
    
end
