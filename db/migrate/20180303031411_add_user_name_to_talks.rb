class AddUserNameToTalks < ActiveRecord::Migration[5.1]
  def change
    add_column :talks, :user_name, :string
  end
end
