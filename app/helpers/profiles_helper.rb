module ProfilesHelper
  def icon_url(user)
    if user.icon.attached?
      url_for(user.icon)
    else
      asset_path("icon_seed.jpg")
    end
  end
end
