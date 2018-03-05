class SessionsController < ApplicationController
  skip_before_action :require_user, only: %i(new create)

  def show
    render json: session[:user]
  end

  def new
  end

  def create
    session[:user] = params.require(:session)[:user]
    redirect_to root_path
  end

  def destroy
    reset_session
    head :ok
  end
end
