Rails.application.routes.draw do
  resources :users, only: [:index, :show, :create, :update, :destroy]
  resources :characters, only: [:index, :show, :create, :update, :destroy]
  resources :action_logs, only: [:index, :show, :create]


end
