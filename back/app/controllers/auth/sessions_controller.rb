class Auth::SessionsController < DeviseTokenAuth::SessionsController
  after_action :set_token_info, only: [:create]

  private

  def set_token_info
    return unless @resource

    # トークンを生成
    token = @resource.create_new_auth_token

    # ヘッダーにトークンを設定
    response.set_header('access-token', token['access-token'])
    response.set_header('client', token['client'])

    # レスポンスのボディをカスタマイズ
    response.body = { user: @resource, token: token }.to_json
  end
end