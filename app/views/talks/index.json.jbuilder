json.array! @talks do |talk|
  json.id talk.id
  json.note talk.note
  json.icon_url talk.user_icon_url
  json.created_at talk.created_at
  json.user_name talk.user_name
end
