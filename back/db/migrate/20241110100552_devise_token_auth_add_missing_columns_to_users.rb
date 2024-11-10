class DeviseTokenAuthAddMissingColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    change_table :users do |t|
      ## Confirmable
      t.string :confirmation_token
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      t.string :unconfirmed_email # Only if using reconfirmable

    end

    # Confirmable関連のインデックスを追加
    add_index :users, :confirmation_token, unique: true
    # add_index :users, :unlock_token, unique: true # Lockableを使用する場合のみ
  end
end