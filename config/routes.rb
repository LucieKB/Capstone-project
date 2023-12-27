Rails.application.routes.draw do
  resources :messages
  resources :rewards
  resources :goals
 
  
  resources :schools, only: :index

  resources :users, only: [:index, :show, :create]
  get "users/:id/mygoals", to: "users#user_and_goals"
  # get "/mystudent", to: "users#only_my_student"

  # resources :parents do
  #   collection do
  #     get "/mystudent", to: "parents#only_my_student", as: :mystudent
  #   end
  # end

  # resources :users do
    patch "/payment/:student_id/goals/:id", to: "students#update_payment"
    patch "students/avatar/:id", to: "students#update_avatar"
  # end

  patch "parents/students/:student_id/goals/:id", to: "goals#update"
  

  resources :educators
  get "educators/mystudents/:grade", to: "educators#students_per_grade"

  resources :students do
    resources :goals, only: [:index, :show, :create, :update]
  end

  get "students/:id/myadults", to: "students#my_adults"
  get "parents/:student_id/mycontacts", to: "parents#my_contacts"
  get "educators/:student_id/mycontacts", to: "educators#my_contacts"

 
  # patch "/payment/:student_id/goals/:id", to: "students#update_payment"


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  # Rails.application.routes.draw do
  resources :messages
  patch "messages/:goal_id/read", to: "messages#set_read"

  resources :rewards
  patch "rewards/:id/buy", to:"rewards#buy_reward"

 
  # resources :schools
  # resources :users
  # resources :parents
  # resources :educators
  # resources :messages
  # resources :goals
  # resources :students
  # resources :adultusers
    # route to test your configuration
   

    post "/signup", to: "users#create"
    get "/me", to: "users#show"

    post "/login", to: "sessions#create"
    delete"/logout", to: "sessions#destroy"

    get "/schools/name", to: "schools#schools_by_name"
  # end
  
end
