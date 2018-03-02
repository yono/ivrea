class ChannelsController < ApplicationController
  def index
    @channels = Channel.all
    respond_to do |format|
      format.json { render json: @channels }
    end
  end
end
