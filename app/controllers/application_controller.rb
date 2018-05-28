class ApplicationController < ActionController::Base
  http_basic_authenticate_with name: ENV['BASIC_AUTH_USERNAME'], password: ENV['BASIC_AUTH_PASSWORD'] if Rails.env.production?

  protect_from_forgery with: :exception
  before_action :require_user
  helper_method :current_user, :current_user=

  def require_user
    redirect_to new_sessions_path unless session[:user_id]
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def current_user=(user)
    @current_user = user
  end
end
