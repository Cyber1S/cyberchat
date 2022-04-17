class ApiController < ApplicationController
  skip_before_action :set_current_user, only: [:index]

  def index
    render json: { version: Cyber1SChat.config[:version], timestamp: Time.now.utc.to_formatted_s(:db) }
  end
end
