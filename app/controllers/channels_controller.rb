class ChannelsController < ApplicationController
  def index
    @channels = Channel.all
    render json: @channels
  end

  def create
    if channel = Channel.create!(channel_params)
      render json: {head: :ok}
    else
      render json: {status: "error",
                    code: 500,
                    content: {message: channel.errors.full_messages.join}}
    end
  end

  def destroy
    @channel = Channel.find(params[:id])
    @channel.destroy
    ActionCable.server.broadcast 'channel_channel', @channel.attributes.merge!(destroy: true)
    render json: {head: :ok}
  end

  private

  def channel_params
    params.require(:channel).permit(:name)
  end
end
