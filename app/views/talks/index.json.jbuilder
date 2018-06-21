json.array! @talks do |talk|
  json.id talk.id
  json.note talk.note
  json.icon_url talk.user_icon_url
  json.created_at I18n.l(talk.created_at, format: :short)
  json.updated_at talk.updated_at
  json.user_name talk.user_name
  json.user_id talk.user_id
end
