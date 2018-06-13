class UserDecorator < Draper::Decorator
  unless Rails.env.production?
    include Rails.application.routes.url_helpers
    default_url_options[:host] = 'localhost:3000'
  end
  delegate_all

  def icon_url
    if icon.attached?
      unless Rails.env.production?
        url_for(icon)
      else
        icon.service_url
      end
    else
      asset_path("icon_seed.jpg")
    end
  end
end
