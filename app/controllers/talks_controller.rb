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

  def update
    @talk = Talk.find(params[:id])
    if @talk.update(talk_params)
      @talk = @talk.decorate
      @talk_attributes = {
        id: @talk.id,
        note: @talk.note,
        icon_url: @talk.user_icon_url,
        created_at: I18n.l(@talk.created_at, format: :short),
        updated_at: @talk.updated_at,
        user_name: @talk.user_name,
        user_id: @talk.user_id,
        channel_id: @talk.channel_id
      }
      ActionCable.server.broadcast 'chat_channel', @talk_attributes
      render json: {head: :ok}
    else
      render json: {status: "error",
                    code: 500,
                    content: {message: @talk.errors.full_messages.join}}
    end
  end

  def destroy
    @talk = Talk.find(params[:id])
    if @talk.destroy
      ActionCable.server.broadcast 'chat_channel', @talk.attributes.merge!(destroy: true)
      render json: {head: :ok}
    else
      render json: {status: "error",
                    code: 500,
                    content: {message: @talk.errors.full_messages.join}}
    end
  end

  private

  def talk_params
    params.require(:talk).permit(:note)
  end
end
