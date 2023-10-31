class ApplicationController < ActionController::API
    include ActionController::Cookies
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  before_action :authorized

  def render_unprocessable_entity(invalid)
    render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  private

  def authorized
    @current_user = User.find_by(id: session[:user_id])
    return render json: {error: "Not authorized"}, status: :unauthorized unless @current_user
  end

    
end
