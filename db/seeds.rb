# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

general_channel = Channel.find_or_create_by!(name: 'General')
general_channel.talks.create!(note: 'Hello!', user_name: 'Test User') if general_channel.talks.count.zero?

random_channel = Channel.find_or_create_by!(name: 'Random')
random_channel.talks.create!(note: 'How do you?', user_name: 'Test User') if random_channel.talks.count.zero?
