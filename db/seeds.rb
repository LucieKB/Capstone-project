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
require 'csv'
puts "seeding..."

    csv_text = File.read(Rails.root.join('lib', 'seeds', 'Utah_Schools.csv'))
    csv = CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')

    csv.each do |row|
        t = School.new
        t.name = row['School']
        t.public = row['Private'] === "Public"? (true):(false)
        t.save
    end

    10.times do
    Student.create!(username: Faker::Internet.username(specifier: 4-10), email: Faker::Internet.email, password: "1234")
    end

    10.times do
    Parent.create!(username: Faker::Internet.username(specifier: 4-10), email: Faker::Internet.email, password: "1234")
    end

    10.times do
    Student.create!(username: Faker::Internet.username(specifier: 4-10), email: Faker::Internet.email, password: "1234", school: ["Jeremy Ranch School", "Trailside School", "Ecker Hill Middle", "Park City High"].sample, grade: rand(1..12), avatar: Faker::Avatar.image)
    end

puts "✅ Done seeding!"

