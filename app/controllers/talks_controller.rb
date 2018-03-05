class TalksController < ApplicationController
  def index
    raise unless params[:channel_id]
    channel = Channel.find params[:channel_id]
    @talks = channel.talks
    render json: @talks
  end

  private

  def talk_params
    params.require(:talk).permit(:note)
  end
end
