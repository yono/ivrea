# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Channel.find_or_create_by!(name: 'General')
Channel.find_or_create_by!(name: 'Random')

unless User.find_by(email: 'test@example.com')
  user = User.create!(
    name: 'test',
    email: 'test@example.com',
    password: 'password',
    password_confirmation: 'password'
  )
  user.icon.attach(
    io: File.open(Rails.root.join('db', 'icon_seed.jpg')),
    filename: 'icon_seed.jpg',
    content_type: 'image/jpeg'
  )
end
