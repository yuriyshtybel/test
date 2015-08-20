Player::Application.routes.draw do

  root :to => 'players#via_rss'

  resource :players, :only => [] do
    collection do
      get 'via_rss'
      get 'via_js'
      get 'via_js_left'
    end
  end

end
