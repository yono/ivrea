class AddUserIdToTalks < ActiveRecord::Migration[5.1]
  def change
    add_column :talks, :user_id, :integer
  end
end
