class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :configure_permitted_parameters, if: :devise_controller?

  include ApplicationHelper

  def after_sign_in_path_for(resource)
    root_path
  end

  def after_sign_out_path_for(resource)
    home_path
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << :name
  end
  protect_from_forgery with: :exception

  # API
  def render_success(message = '')
    @_success = true
    render(
      json: { success: true, message: message },
      status: 200,
    )
  end
end
