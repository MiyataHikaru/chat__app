class FriendsController < ApplicationController

  def create
    @user = User.find(params[:user_id])
    if current_user.active_relationships.find_by(followed_id: @user.id)
      redirect_to root_path
    else
      follow = current_user.active_relationships.build(followed_id: @user.id)
      follow.save
      redirect_to root_path
    end
  end

  def destroy
    @user = User.find(params[:user_id])
    follow = current_user.active_relationships.find_by(followed_id: @user.id)
    follow.destroy
    redirect_to root_path
  end
end
