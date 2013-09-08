grubbinsApp = angular.module "grubbinsApp", ["ngResource"]

grubbinsApp.config ($httpProvider) ->
  authToken = $("meta[name=\"csrf-token\"]").attr("content")
  $httpProvider.defaults.headers.common["X-CSRF-TOKEN"] = authToken

grubbinsApp.service "ListService", ["$resource", ($resource) ->
  Item = $resource("/items/:id", {id: "@id"}, {update: {method: "PUT"}})
  items = Item.query()
  return {
    getItems: ->
      items
    addItem: (newItem) ->
      item = Item.save(newItem)
      items.push item
    # TODO: add this functionality
    removeItem: ->

  }]

grubbinsApp.directive "ingredient", ->
  # TODO: move addToList fn out of element
  buttonElement = angular.element "<button ng-click='addToList(ingredient)' class='add-ingredient'>Add</button>"

  {
    restrict: "E"
    replace: true
    compile: (tElem) ->
      tElem.prepend(buttonElement)
    template: "<form ng-repeat='ingredient in ingredients'>" + 
                "<input class='quantity' name='quantity' ng-model='ingredient.quantity' type='text'>" + 
                "<input class='measurement' name='measurement' ng-model='ingredient.measurement' type='text'>" + 
                "<input class='content' name='content' ng-model='ingredient.content' type='text'>" + 
              "</form>"

  }

grubbinsApp.directive "shoppingListItem", ->
  {
    restrict: "E"
    replace: true
    scope: 
      items: "="
    template: "<div class='item' ng-repeat='item in items'>" +
                "<span class='quantity'>{{item.quantity}} </span>" +
                "<span class='measurement'>{{item.measurement}} </span>" +
                "<span class='content'>{{item.content}}</span>" +
              "</div>"

  }

grubbinsApp.controller("RecipeCtrl", ["$scope", "ListService", ($scope, ListService) ->
  $scope.init = (newItems) ->
    $scope.ingredients = newItems
    console.log $scope.ingredients
  $scope.addToList = (ingredient)->
    ListService.addItem ingredient
    console.log ListService.getItems()
])

grubbinsApp.controller 'ListCtrl', ($scope, ListService) ->
  $scope.getItems = ->
    ListService.getItems()