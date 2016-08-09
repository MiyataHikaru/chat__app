Rails.application.routes.draw do
  devise_for :users
  namespace :api, { format: 'json' } do
    get 'messages/:id' => 'messages#index'
    post 'messages/:id' => 'messages#create'
  end
  root 'home#home'
  resources :users, only: [:show, :index, :edit, :update, :destroy]
  get 'messages' => 'messages#index'
end
