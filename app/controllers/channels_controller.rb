class ChannelsController < ApplicationController
  def index
    @channels = Channel.all
    render json: @channels
  end
end
