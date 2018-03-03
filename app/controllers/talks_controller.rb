class TalksController < ApplicationController
  def index
    raise unless params[:channel_id]
    channel = Channel.find params[:channel_id]
    @talks = channel.talks
    respond_to do |format|
      format.json { render json: @talks }
    end
  end

  def create
    channel = Channel.find params[:channel_id]
    @talk = channel.talks.new(talk_params.merge(user_name: session[:user]))
    if @talk.save
      respond_to do |format|
        format.json { render json: @talk, status: :created}
      end
    else
      puts @talk.errors.full_messages
    end
  end

  private

  def talk_params
    params.require(:talk).permit(:note)
  end
end
