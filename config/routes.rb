Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'top#home'
  resources :channels, only: %i(index create destroy) do
    resources :talks, only: %i(index create destroy)
  end
  resource :sessions, only: %i(show new create destroy)
  resource :profiles, only: %i(show edit update)
  resource :registrations, only: %i(new create)
  resources :password_resets, module: :user, param: :code do
    get :completed, on: :collection
  end
  resources :accounts, only: :index
end
