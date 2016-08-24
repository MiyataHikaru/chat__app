class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable, :validatable
  validates :name, presence: true, length: { maximum: 20 }
  validates :content, length: { maximum: 50 }
  has_many :active_relationships, class_name: "Friend",
                                  foreign_key: "follower_id",
                                  dependent: :destroy
  has_many :passive_relationships, class_name: "Friend",
                                   foreign_key: "followed_id",
                                   dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower
  has_many :messages, class_name: "Message",
                       foreign_key: "from",
                       dependent: :destroy

  def last_message(user)
    to_messages = self.messages.where(user_id: user.id)
    from_messages = user.messages.where(user_id: self.id)
    messages = (to_messages.concat(from_messages).sort_by &:created_at)
    last_message = messages.last
    return last_message
  end
end
