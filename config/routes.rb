Rails.application.routes.draw do
  devise_for :users
  namespace :api, { format: 'json' } do
    get 'messages/:id' => 'messages#index'
    post 'messages/:id' => 'messages#create'
    get 'search' => 'users#search'
    get 'following' => 'users#following'
    get 'followers' => 'users#followers'
  end
  get 'home' => 'home#home'
  resources :users, only: [:show, :index, :edit, :update, :destroy]
  root 'messages#index'
  get 'search' => 'users#search'
  post 'follow/:user_id' => 'friends#create'
  delete 'unfollow/:user_id' => 'friends#destroy'
end
