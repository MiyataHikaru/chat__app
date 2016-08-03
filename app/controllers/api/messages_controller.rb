module Api
  class MessagesController < ApplicationController

    def index
      id = params[:id]
      @messages = Message.where(chat_id: id)
      render json: @messages
    end
  end
end
