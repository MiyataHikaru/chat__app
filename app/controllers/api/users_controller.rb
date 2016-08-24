class Api::UsersController < ApplicationController
  def search
    @users = User.where.not(id: current_user.id)
    render json: @users
  end

  def following
    @users = current_user.following
    last_messages = {}
    @users.each do |user|
      last_messages[user.id] = current_user.last_message(user)
    end
    render json: {
      users: @users,
      last_messages: last_messages,
    }
  end

  def current
    @user = current_user
    render json: @user
  end
end
