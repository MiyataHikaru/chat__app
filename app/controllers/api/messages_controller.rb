class Api::MessagesController < ApplicationController
  def create
    # binding.pry
    @message = Message.new(message_params)
    @message.save
    redirect_to root_path
  end

  def index
    id = params[:id]
    @messages = Message.where(chat_id: id)
    render json: @messages
  end

private

  def message_params
    params.require(:message).permit(:content, :chat_id)
  end
end
