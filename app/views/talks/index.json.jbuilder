json.array! @talks do |talk|
  json.id talk.id
  json.note talk.note
  if talk.user
    json.icon_url url_for(talk.user.icon)
  else
    json.icon_url asset_path("icon_seed.jpg")
  end
  json.created_at talk.created_at
  json.user_name talk.user_name
end
