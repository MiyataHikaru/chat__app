class RemoveTimestampToMessages < ActiveRecord::Migration
  def change
    remove_column :messages, :timestamp, :string
  end
end
