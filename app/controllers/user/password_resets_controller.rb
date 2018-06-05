class User::PasswordResetsController < ApplicationController
  skip_before_action :require_user

  def new
    @user = User.new
  end

  def create
    @user = User.find_by(email: user_params["email"])
    if @user
      @user.create_reset_password_link
      password_reset = @user.password_resets.first
      PasswordResetMailer.password_reset_link_email(@user, password_reset).deliver
      render :new
    else
      render :new, notice: 'hoge'
    end
  end

  def edit
    password_reset = User::PasswordReset.find_by(code: params[:code])
    if !password_reset || password_reset.expired?
      redirect_to root_url
    end
  end

  def update
    password_reset = User::PasswordReset.find_by(code: params[:code])
    if !password_reset || password_reset.expired?
      redirect_to root_url
    end

    user = password_reset.user
    if user.update(password_reset_params)
      redirect_to completed_password_resets_url
    else
      render :edit
    end
  end

  def completed
  end

  private

  def user_params
    params.require(:user).permit(:email)
  end

  def password_reset_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
