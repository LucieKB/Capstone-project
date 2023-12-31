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

ActiveRecord::Schema[7.1].define(version: 2023_12_05_174119) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "business_owners", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "goals", force: :cascade do |t|
    t.string "title"
    t.text "description"
    t.date "deadline"
    t.boolean "achieved"
    t.integer "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.string "goal_category"
    t.boolean "validated_by_parent"
    t.boolean "validated_by_educator"
    t.boolean "achieved_by_parent"
    t.boolean "achieved_by_educator"
    t.index ["user_id"], name: "index_goals_on_user_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "content"
    t.string "recipient"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "goal_id", null: false
    t.boolean "read", default: false
    t.index ["goal_id"], name: "index_messages_on_goal_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "rewards", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.string "image"
    t.string "pickup_place"
    t.integer "price"
    t.boolean "available"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "reward_category"
    t.string "reward_condition"
    t.boolean "collected"
    t.integer "buyer"
    t.index ["user_id"], name: "index_rewards_on_user_id"
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
    t.float "wallet"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "parent_id"
    t.bigint "educator_id"
    t.integer "number_of_children"
    t.string "business"
    t.bigint "business_owners_id"
    t.index ["business_owners_id"], name: "index_users_on_business_owners_id"
    t.index ["educator_id"], name: "index_users_on_educator_id"
    t.index ["parent_id"], name: "index_users_on_parent_id"
  end

  add_foreign_key "goals", "users"
  add_foreign_key "messages", "goals"
  add_foreign_key "messages", "users"
  add_foreign_key "rewards", "users"
  add_foreign_key "users", "users", column: "business_owners_id"
  add_foreign_key "users", "users", column: "educator_id"
  add_foreign_key "users", "users", column: "parent_id"
end
