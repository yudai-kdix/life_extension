class CharactersController < ApplicationController
  # 特定のキャラクター情報を取得
  def show
    @character = Character.find(params[:id])
    # TODO: 今日初めてログインしたかどうか判定
    @character.update_age
    # 死亡判定をサービス層から処理する
    @character.update_characters_status_by_lifespan
    render json: @character
  end

  # 特定のユーザーのキャラクター一覧を取得
  def index_by_user
    @user = User.find(params[:user_id])
    @characters = @user.characters.order(created_at: :desc)
    render json: @characters
  end

  # キャラクターを新規作成
  def create
    @character = Character.new(character_params)
    @character.user_id = params[:user_id]
    @character.age = 0
    @character.lifespan = 7
    @character.health_points = 8
    @character.status = 1
    
    if @character.save
      render json: @character, status: :created
    else
      render json: @character.errors, status: :unprocessable_entity
    end
  end

  # キャラクター情報を更新
  def update
    @character = Character.find(params[:id])

    if @character.update(character_params)
      render json: @character
    else
      render json: @character.errors, status: :unprocessable_entity
    end
  end

  # キャラクターを削除
  def destroy
    @character = Character.find(params[:id])
    @character.destroy
    head :no_content
  end

  private

  # Strong Parameters
  def character_params
    params.permit(:character_name)
  end
end