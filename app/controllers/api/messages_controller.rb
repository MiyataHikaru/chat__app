class Api::MessagesController < ApplicationController
  def create
    # binding.pry
    @message = Message.new(message_params)
    @message.from = current_user.id
    @message.save
    redirect_to root_path
  end

  def index
    id = params[:id]
    @messages = current_user.messages.where(user_id: id)
    render json: @messages
  end

private

  def message_params
    params.require(:message).permit(:content, :user_id)
  end
end
