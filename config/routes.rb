Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'top#home'
  resources :channels, only: :index do
    resources :talks, only: [:index, :create]
  end
  resource :sessions, only: %i(new create destroy)
end
