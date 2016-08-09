class AddTimestampToMessages < ActiveRecord::Migration
  def change
    add_column :messages, :timestamp, :DATATIME
  end
end
