grubbinsApp = angular.module "grubbinsApp", ["ngResource"]

grubbinsApp.config ($httpProvider) ->
  authToken = $("meta[name=\"csrf-token\"]").attr("content")
  $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken

grubbinsApp.service "ListService", ["$resource", ($resource) ->
  ItemResource = $resource("/ingredients/:id", {id: "@id"}, {update: {method: "PUT"}})
  recipes = []
  items = ItemResource.query (response) -> 
      recipe_ids = []
      response.map (item) -> 
        if recipe_ids.indexOf(item.recipe.id) == -1
          recipe_ids.push item.recipe.id
          recipes.push item.recipe
  return {
    getItems: ->
      items
    getItemRecipes: ->
      recipes
    addItem: (newItem) ->
      item = ItemResource.save newItem, ->
        items.push item
        recipe_ids = recipes.map (r) -> r.id
        if recipe_ids.indexOf(item.recipe.id) == -1
          recipes.push item.recipe
        newItem._added = true
    removeItem: (oldItem) ->
      index = items.indexOf(oldItem)
      # remove recipe
      oldItem.$delete()
      items.splice index, 1
  }]

grubbinsApp.directive "ingredient", ->
  # TODO: move addToList fn out of element
  buttonElement = angular.element "<button ng-click='addToList(ingredient)' class='add-ingredient'>Add</button>"

  {
    restrict: "E"
    replace: true
    compile: (tElem) ->
      tElem.prepend(buttonElement)
    # TODO: move to templateUrl
    template: "<form ng-repeat='ingredient in ingredients'>" +
                "<input class='quantity' name='quantity' ng-model='ingredient.quantity' type='text'>" +
                "<input class='measurement' name='measurement' ng-model='ingredient.measurement' type='text'>" +
                "<input class='content' name='content' ng-model='ingredient.content' type='text'>" +
              "</form>"

  }

grubbinsApp.directive "shoppingListItem", ->
  removeElement = angular.element "<button ng-click='ondelete({item: item, index: $index})' class='remove'>&times;</button>"
  {
    restrict: "E"
    replace: true
    compile: (tElem) ->
      tElem.append(removeElement)
    scope:
      item: "="
      ondelete: "&"
    template: "<div class='item' ng-class='{strike: item.obtained}'>" +
                "<input type='checkbox' ng-model='item.obtained'>" +
                "<span class='quantity'>{{item.quantity}} </span>" +
                "<span class='measurement'>{{item.measurement}} </span>" +
                "<span class='content'>{{item.content}}</span>" +
                "<span class='recipe-ref'>{{item.recipe_id}}</span>" +
              "</div>"

  }
grubbinsApp.directive "shoppingListRecipe", ->
  {
    scope: 
      recipe: "="
    restrict: "E"
    replace: true
    template: "<div>{{recipe.title}}</div>"
  }

grubbinsApp.directive "recipe", ->
  {
    restrict: "E"
    template: "<h4>for <a href={{recipe.url}}>{{recipe.title}}</a></h4>"
    replace: true
  }

grubbinsApp.controller("RecipeCtrl", ["$scope", "ListService", ($scope, ListService) ->
  $scope.init = (newItems) ->
    $scope.ingredients = newItems
    $scope.recipe = $scope.ingredients[0].recipe
  $scope.addToList = (ingredient)->
    ListService.addItem ingredient
])

grubbinsApp.controller 'ListCtrl', ($scope, ListService) ->
  $scope.items   = ListService.getItems()
  $scope.recipes = ListService.getItemRecipes()

  $scope.deleteItem = (item) ->
    ListService.removeItem(item)
