Rails.application.routes.draw do
  # devise_for :users
  # devise-token-authを用いたユーザー登録
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'auth/registrations',
    sessions: 'auth/sessions'
  }
  post 'users/login', to: 'users#login'
  # ユーザーに紐づくキャラクターの一覧を取得
  get '/users/:user_id/characters', to: 'characters#index_by_user'
  resources :users, only: [:index, :show, :create, :update, :destroy]
  post '/characters', to: 'characters#create'
  options '/characters', to: 'characters#create'
  resources :characters, only: [:index, :show, :update, :destroy]
  resources :action_logs, only: [:index, :show, :create]

  # 行動ログ取得用のエンドポイント
  get '/users/:id/action', to: 'action_logs#user_actions'
  get '/characters/:id/logs', to: 'action_logs#index_by_character'
  # 当日の食事ログを取得
  get '/users/:user_id/meal', to: 'action_logs#meal_logs'

  get '/characters/death_detail', to: 'action_logs#character_death'
end
