class TalksController < ApplicationController
  def index
    raise unless params[:channel_id]
    channel = Channel.find params[:channel_id]
    @talks = channel.talks.includes(:user)
    if params[:after]
      @talks = @talks.where("talks.id > ?", params[:after])
    end
    @talks = @talks.decorate
  end

  def destroy
    @talk = Talk.find(params[:id])
    @talk.destroy
    render json: {head: :ok}
  end

  private

  def talk_params
    params.require(:talk).permit(:note)
  end
end
