class Talk < ApplicationRecord
  validates :note, presence: true
  belongs_to :channel
  belongs_to :user

  def user_name
    user&.name || attributes["user_name"] || "名無し"
  end
end
