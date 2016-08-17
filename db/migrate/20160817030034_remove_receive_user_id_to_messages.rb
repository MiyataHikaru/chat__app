class RemoveReceiveUserIdToMessages < ActiveRecord::Migration
  def change
    remove_column :messages, :receive_user_id, :string
  end
end
