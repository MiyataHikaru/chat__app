class Api::UsersController < ApplicationController
  def search
    @users = User.where.not(id: current_user.id)
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

  def current
    @user = current_user
    render json: @user
  end
end
