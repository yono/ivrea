class RegistrationsController < ApplicationController
  skip_before_action :require_user

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      unless @user.icon.attached?
        @user.icon.attach(
          io: File.open(Rails.root.join('db', 'icon_seed.jpg')),
          filename: 'icon_seed.jpg',
          content_type: 'image/jpeg'
        )
        @user.save!
      end
      session[:user_id] = @user.id
      account = @user.attributes.slice("id", "name")
      account = { name: "@#{account["name"]}", id: account["id"] }
      ActionCable.server.broadcast 'account_channel', account
      redirect_to root_path
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :icon)
  end
end
