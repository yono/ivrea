class SessionsController < ApplicationController
  skip_before_action :require_user

  def new
  end

  def create
    session[:user] = params.require(:session)[:user]
    redirect_to root_path
  end
end
