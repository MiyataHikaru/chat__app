class AddIndexForFriends < ActiveRecord::Migration
  def change
    add_index :friends, [:follower_id, :followed_id], unique: true
    add_index :friends, [:followed_id, :follower_id], unique: true
  end
end
