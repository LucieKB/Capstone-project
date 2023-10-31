Rails.application.routes.draw do
  resources :schools, only: :index
  resources :users
  resources :parents
  resources :educators
  resources :messages
  resources :goals
  resources :students


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  # Rails.application.routes.draw do
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
