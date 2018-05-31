Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'top#home'
  resources :channels, only: %i(index create) do
    resources :talks, only: %i(index create)
  end
  resource :sessions, only: %i(show new create destroy)
  resource :profiles, only: %i(show edit update)
  resource :registrations, only: %i(new create)
end
