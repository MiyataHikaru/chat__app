class Api::UsersController < ApplicationController
  def search
    @users = User.all
    render json: @users
  end

  def following
    @users = current_user.following
    render json: @users
  end

  def followers
    @users = current_user.followers
    render json: @users
  end
end
