class Api::UsersController < ApplicationController
  # 中身を見る限り、全然searchしてないから、関数名変えよう
  def search
    # インスタンス変数にする必要無い
    @users = User.all
    render json: @users
  end
end
