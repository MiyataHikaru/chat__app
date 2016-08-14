Rails.application.routes.draw do
  devise_for :users
  namespace :api, { format: 'json' } do
    get 'messages/:id' => 'messages#index'
    post 'messages/:id' => 'messages#create'
    get 'search' => 'users#search'
  end
  get 'home' => 'home#home'
  resources :users, only: [:show, :index, :edit, :update, :destroy]
  root 'messages#index'
  get 'search' => 'users#search'
end
