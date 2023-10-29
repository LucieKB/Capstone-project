# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
require 'faker'
puts "seeding..."

    20.times do
    Adultuser.create!(username: Faker::Internet.username(specifier: 4-10), email: Faker::Internet.email, password: "1234", user_type: ["parent", "educator"].sample )
    end

puts "✅ Done seeding!"

