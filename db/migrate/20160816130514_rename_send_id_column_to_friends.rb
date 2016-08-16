class RenameSendIdColumnToFriends < ActiveRecord::Migration
  def change
    rename_column :friends, :send_id, :follower_id
  end
end
