class CreateTalks < ActiveRecord::Migration[5.1]
  def change
    create_table :talks do |t|
      t.text :note
      t.bigint :channel_id

      t.timestamps
    end
  end
end
