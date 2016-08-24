class UsersController < ApplicationController
  before_action :set_user ,only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  before_action :correct_user, only: [:edit, :update, :destroy]

  def show
  end

  def index
    @users = User.where.not(id: current_user.id).paginate(page: params[:page])
  end

  def search
  end

  def edit
  end

  def update
    file = params[:user][:image]
    unless file.nil?
      file_name = file.original_filename
      File.open("public/user_images/#{file_name}", 'wb'){|f| f.write(file.read)}
      @user.image = file_name
    end

    if @user.update(user_params)
      redirect_to @user, notice: "プロフィールを更新しました。"
    else
      render :edit
    end
  end

  def destroy
    @user.destroy
    redirect_to root_path, notice: "ユーザーを消去しました。"
  end
end

private

def set_user
  @user = User.find(params[:id])
end

def user_params
  params.require(:user).permit(:name, :email, :password, :content)
end

def correct_user
  # binding.pry
  user = User.find(params[:id])
  unless current_user.id == user.id
    redirect_to root_path, alert: 'それはダメ！！'
  end
end
