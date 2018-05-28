class ApplicationController < ActionController::Base
  http_basic_authenticate_with name: ENV['BASIC_AUTH_USERNAME'], password: ENV['BASIC_AUTH_PASSWORD'] if Rails.env.production?

  protect_from_forgery with: :exception
  before_action :require_user

  def require_user
    redirect_to new_sessions_path unless session[:user_id]
  end
end
