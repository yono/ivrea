class User < ApplicationRecord
  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  has_secure_password

  has_many :talks
  has_one_attached :icon
  has_many :password_resets, class_name: 'User::PasswordReset', dependent: :destroy

  def create_reset_password_link
    password_resets.destroy_all
    password_reset = password_resets.create!
    password_reset.expired_at = Time.zone.now + 1.hour
    password_reset.save!
  end
end
