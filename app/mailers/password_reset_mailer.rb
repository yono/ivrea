class PasswordResetMailer < ApplicationMailer
  default from: ENV.fetch('MAIL_SENDER', 'admin@example.com')

  def password_reset_link_email(user, password_reset)
    @user = user
    @password_reset = password_reset
    mail(to: @user.email, subject: 'Reset your password')
  end
end
