class RenameReceiveIdColumnToFriends < ActiveRecord::Migration
  def change
    rename_column :friends, :receive_id, :followed_id
  end
end
