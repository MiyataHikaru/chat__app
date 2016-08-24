class Api::MessagesController < ApplicationController
  def create
    # binding.pry
    file = params[:file]
    @message = Message.new(content: params[:content], user_id: params[:user_id])
    @message.from = current_user.id
    unless file.nil?
      file_name = file.original_filename
      File.open("public/message_images/#{file_name}", 'wb'){|f| f.write(file.read)}
      @message.file = file_name
    end
    @message.save
    redirect_to root_path
  end

  def index
    id = params[:id]
    @messages = current_user.messages.where(user_id: id)
    @from_messages = User.find(id).messages.where(user_id: current_user.id)
    render json: (@messages.concat(@from_messages).sort_by &:created_at)
  end
end
