class EducatorsController < UsersController

    def my_contacts
        my_kidObj = User.all.find_by(id: params[:student_id])
        my_parentId = my_kidObj.educator_id
        my_parentObj = User.all.find_by(id: my_parentId)
        my_kid=my_kidObj.username
        my_parent=my_parentObj.username
        my_contacts = ["", my_kid, my_parent]
        render json: my_contacts, status: :ok
    end

end
