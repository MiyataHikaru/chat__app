class FriendsController < ApplicationController

  def create
    @user = User.find(params[:user_id])
    friend = Friend.new(follower_id: current_user.id, followed_id: @user.id)
    friend.save
    redirect_to root_path
  end

  def destroy
    @user = User.find(params[:user_id])
    follow = current_user.active_relationships.find_by(followed_id: @user.id)
    follow.destroy
    redirect_to root_path
  end
end
