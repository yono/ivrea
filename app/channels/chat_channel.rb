class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def post(data)
    channel = Channel.find(data['channel_id'])
    user = User.find(data['user_id'])
    talk = channel.talks.create(
      note: data['message'],
      user_id: data['user_id'],
      user_name: user.name
    )
    talk = talk.decorate
    talk_attributes = {
      id: talk.id,
      note: talk.note,
      icon_url: talk.user_icon_url,
      created_at: I18n.l(talk.created_at, format: :short),
      updated_at: talk.updated_at,
      user_name: talk.user_name,
      user_id: talk.user_id,
      channel_id: talk.channel_id
    }
    ActionCable.server.broadcast 'chat_channel', talk_attributes
  end
end
