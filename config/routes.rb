Rails.application.routes.draw do
  namespace :api, { format: 'json' } do
    get 'messages/:id' => 'messages#index'
  end
  root 'messages#index'
end
