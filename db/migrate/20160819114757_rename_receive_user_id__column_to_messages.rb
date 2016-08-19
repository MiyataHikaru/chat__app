class RenameReceiveUserIdColumnToMessages < ActiveRecord::Migration
  def change
    rename_column :messages, :receive_user_id, :user_id
  end
end
