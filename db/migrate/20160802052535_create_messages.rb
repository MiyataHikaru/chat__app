class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :send_user_id
      t.integer :receive_user_id
      t.text :content
      t.timestamps null: false
    end
  end
end
