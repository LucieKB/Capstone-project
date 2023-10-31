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

ActiveRecord::Schema[7.1].define(version: 2023_10_31_201728) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "goals", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.date "date_created"
    t.date "deadline"
    t.boolean "achieved"
    t.integer "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.string "text"
    t.string "status"
    t.bigint "goals_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["goals_id"], name: "index_messages_on_goals_id"
  end

  create_table "schools", force: :cascade do |t|
    t.string "name"
    t.boolean "public"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "type"
    t.string "avatar"
    t.integer "grade"
    t.string "school"
    t.integer "wallet"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "parents_id"
    t.bigint "educators_id"
    t.index ["educators_id"], name: "index_users_on_educators_id"
    t.index ["parents_id"], name: "index_users_on_parents_id"
  end

  add_foreign_key "messages", "goals", column: "goals_id"
  add_foreign_key "users", "users", column: "educators_id"
  add_foreign_key "users", "users", column: "parents_id"
end
