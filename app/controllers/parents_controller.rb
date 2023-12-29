class ParentsController < UsersController

    def my_contacts
        my_kidObj = User.all.find_by(id: params[:student_id])
        my_educatorId = my_kidObj.educator_id
        my_educatorObj = User.all.find_by(id: my_educatorId)
        my_kid=my_kidObj.username
        my_educator=my_educatorObj.username
        my_contacts = ["", my_kid, my_educator]
        render json: my_contacts, status: :ok
    end

end
