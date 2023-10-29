Rails.application.routes.draw do
  resources :parents
  resources :educators
  resources :messages
  resources :goals
  resources :students
  resources :adultusers
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  # Rails.application.routes.draw do
  # resources :parents
  # resources :educators
  # resources :messages
  # resources :goals
  # resources :students
  # resources :adultusers
    # route to test your configuration
    get '/hello', to: 'application#hello_world'

    post "/signup", to: "adultusers#create"
    get "/me", to: "adultusers#show"

    post "/login", to: "sessions#create"
    delete"/logout", to: "sessions#destroy"
  end
  
end
