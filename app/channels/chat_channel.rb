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
    ActionCable.server.broadcast 'chat_channel', talk.attributes
  end
end
