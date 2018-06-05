class User::PasswordReset < ApplicationRecord
  belongs_to :user
  after_save :reload # reload しないと保存直後に UUID が取得できない

  def expired?
    expired_at < Time.zone.now
  end
end
