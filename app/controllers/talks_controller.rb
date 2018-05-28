class TalksController < ApplicationController
  def index
    raise unless params[:channel_id]
    channel = Channel.find params[:channel_id]
    @talks = channel.talks.includes(:user)
    render json: @talks.to_json(methods: :user_name)
  end

  private

  def talk_params
    params.require(:talk).permit(:note)
  end
end
