class TalkDecorator < Draper::Decorator
  unless Rails.env.production?
    include Rails.application.routes.url_helpers
    default_url_options[:host] = 'localhost:3000'
  end
  delegate_all

  def user_icon_url
    if user.icon.attached?
      unless Rails.env.production?
        url_for(user.icon)
      else
        user.icon.service_url
      end
    else
      asset_path("icon_seed.jpg")
    end
  end
end
