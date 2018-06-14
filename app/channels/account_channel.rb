class AccountChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'account_channel'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
