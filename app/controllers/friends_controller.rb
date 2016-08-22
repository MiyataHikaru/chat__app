class FriendsController < ApplicationController

  def create
    # 以下の１行はdestroyでもやってるからbefore_actionにまとめる
    @user = User.find(params[:user_id])
    follow = current_user.active_relationships.build(followed_id: @user.id)
    follow.save
    redirect_to root_path
  end

  def destroy
    @user = User.find(params[:user_id])
    follow = current_user.active_relationships.find_by(followed_id: @user.id)
    follow.destroy
  end
end
