class Channel < ApplicationRecord
  has_many :talks
  validates :name, uniqueness: true, presence: true

  after_create_commit :send_new_channel

  private

  def send_new_channel
    ActionCable.server.broadcast 'channel_channel', self.attributes
  end
end
