class CreateUserPasswordResets < ActiveRecord::Migration[5.2]
  def change
    create_table :user_password_resets do |t|
      t.bigint :user_id
      t.uuid :code, default: "uuid_generate_v4()", null: false
      t.datetime :expired_at

      t.index :code, unique: true
    end
  end
end
