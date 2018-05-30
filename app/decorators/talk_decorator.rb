class TalkDecorator < Draper::Decorator
  include Rails.application.routes.url_helpers
  default_url_options[:host] = 'localhost:3000'
  delegate_all

  def user_icon_url
    if user
      url_for(user.icon)
    else
      asset_path("icon_seed.jpg")
    end
  end
end
