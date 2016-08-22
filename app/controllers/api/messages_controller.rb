class Api::MessagesController < ApplicationController
  def create
    # binding.pry
    # インスタンス変数にする必要無い
    @message = Message.new(message_params)
    @message.save
    redirect_to root_path
  end

  def index
    id = params[:id]
    # インスタンス変数にする必要無い
    @messages = Message.where(chat_id: id)
    render json: @messages
  end

private

  def message_params
    params.require(:message).permit(:content, :chat_id)
  end
end
