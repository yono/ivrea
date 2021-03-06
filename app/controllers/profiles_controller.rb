class ProfilesController < ApplicationController
  before_action :set_user, only: %i(show edit update)

  def show
  end

  def edit
  end

  def update
    if @user.update(user_params)
      account = @user.attributes.slice("id", "name")
      account = { name: "@#{account["name"]}", id: account["id"] }
      ActionCable.server.broadcast 'account_channel', account
      redirect_to profiles_path
    else
      render :edit
    end
  end

  private

  def set_user
    @user = current_user
  end

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :icon)
  end
end
