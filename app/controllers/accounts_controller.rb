class AccountsController < ApplicationController
  def index
    @accounts = User.select(:name, :id).map { |user| {name: "@#{user.name}", id: user.id } }
    render json: @accounts
  end
end
