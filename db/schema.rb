# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2023_10_28_173317) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "adultusers", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "user_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "goals", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.date "date_created"
    t.date "goal_date"
    t.boolean "achieved"
    t.integer "value"
    t.bigint "students_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["students_id"], name: "index_goals_on_students_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "message_text"
    t.string "message_status"
    t.bigint "goals_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["goals_id"], name: "index_messages_on_goals_id"
  end

  create_table "students", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "avatar"
    t.integer "grade"
    t.string "school"
    t.integer "wallet"
    t.bigint "adultusers_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["adultusers_id"], name: "index_students_on_adultusers_id"
  end

  add_foreign_key "goals", "students", column: "students_id"
  add_foreign_key "messages", "goals", column: "goals_id"
  add_foreign_key "students", "adultusers", column: "adultusers_id"
end
