class AccountsController < ApplicationController
  def index
    @accounts = User.select(:name).map { |user| "@#{user.name}" }
    render json: @accounts
  end
end
