class CreateFriends < ActiveRecord::Migration
  def change
    create_table :friends do |t|
      t.integer :send_id
      t.integer :receive_id

      t.timestamps null: false
    end
  end
end
