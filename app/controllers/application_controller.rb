class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_action :require_user

  def require_user
    redirect_to new_session_path unless session[:user]
  end
end
