class RenameSendUserIdColumnToMessages < ActiveRecord::Migration
  def change
    rename_column :messages, :send_user_id, :from
  end
end
