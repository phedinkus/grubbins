Grubbins::Application.routes.draw do  resources :items
  root 'list#index'
  resources :ingredients
end
