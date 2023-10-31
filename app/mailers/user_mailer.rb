class UserMailer < ApplicationMailer
    default from: 'notification@example.com'

    def signup_email
        @user = params[:user]
        @url = '/signup'
        mail(to: @user.email, subject: "IMPORTANT: Code for your student registration.")
    end
end
