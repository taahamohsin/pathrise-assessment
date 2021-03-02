# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
file_contents = File.read('app/assets/jobBoards.json')
json = JSON.parse(file_contents)

json['job_boards'].each do |board|
  Source.create!(board)
end

