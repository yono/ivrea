class SessionsController < ApplicationController
  skip_before_action :require_user, only: %i(new create)

  def show
    @user = current_user
  end

  def new
  end

  def create
    user = User.find_by(email: params[:session][:email])
    if user&.authenticate(params[:session][:password])
      session[:user_id] = user.id
      redirect_to root_path
    else
      render :new
    end
  end

  def destroy
    reset_session
    current_user = nil
    head :ok
  end
end
