(function (root, factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['angular'], factory);
  } else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
    module.exports = factory(require('angular'));

  } else {
    return factory(root.angular);
  }

}(this, function (angular) {

  'use strict';

  function Map (){

    Controller.$inject = ['$scope', '$element', '$attrs'];
    function Controller($scope, $element, $attrs){
      var map = $element[0];
      var instance = L.map(map);

      this.instanceMap = instance;
    }

    function Linker(scope, element, attrs, controller) {
      var instanceMap = controller.instanceMap;
      var layer = scope.layer;

      if (layer == undefined) {
        var layer = "mapbox.streets"
      } else if (layer != ""){
        var layer = "mapbox." + layer;
      } else {
        var layer = "mapbox.streets";
      }

      var mapboxLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        id: layer,
        accessToken: 'pk.eyJ1IjoiZmVsaXBlc291c2EiLCJhIjoiY2lmZTZlZjdtNmluMnN5bHhjZjZibmtleSJ9.wFJg3iudeLfXKlYkZM_iCw'
      });

      instanceMap
        .addLayer(mapboxLayer)
        .setView([51.505, -0.09], 15)

    }

    return {
      template: "<div id='mapId'><div ng-transclude></div></div>",
      scope: {
        layer: '@'
      },
      restrict: 'E',
      transclude: true,
      replace: true,
      controller: Controller,
      link: Linker
    }
  }

  function Marker (){
    function Linker (scope, elem, attrs, controllerMap){
      var instanceMap = controllerMap.instanceMap;

      instanceMap.on('click', function (e){
        var local = e.latlng;
        var marker = L.marker()
                      .setLatLng([local.lat, local.lng])

        instanceMap
          .addLayer(marker)
      })
    }

    return {
      restrict: 'E',
      require: '^^map',
      link: Linker
    }
  }

  var ngLeaflet = angular.module('ngLeaflet', []);

  ngLeaflet.directive('map', Map);
  ngLeaflet.directive('marker', Marker);

  return ngLeaflet;
}));
