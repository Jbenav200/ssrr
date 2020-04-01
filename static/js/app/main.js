// we use define instead of require when we create a module
define([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "esri/layers/support/LabelClass",
  "esri/PopupTemplate"
], function (WebScene, SceneView, FeatureLayer, LabelClass, PopupTemplate) {

  // the module exports an object with an init method
  // init creates the web scene and the view
  return {

    init: function() {

      // the web scene is the data model: it contains the basemap, the ground and the layers
      const webscene = new WebScene({
        basemap: "dark-gray"
      });

      // the view is the visual representation of the web scene
      const view = new SceneView({
        container: "view",
        map: webscene
      });

      // setting the view as a global object is useful for debugging
      window.view = view;

      const countryBoundaries = new FeatureLayer({
        url: "http://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Countries_(Generalized)/FeatureServer",
        title: "World Countries",

        // we use a simple renderer when we want to symbolize all features with the same symbol
        renderer: {
          type: "simple",
          symbol: {
            type: "polygon-3d",
            symbolLayers: [{
              type: "fill",
              material: {color: [255, 250, 239, 0.0]},
              outline: {
                color: [70, 70, 70, 0.7]
              }
            }]
          }
        }
      });

      // then we add the layer to the web scene
      // I use the addMany method because we'll add some more layers later
      webscene.addMany([countryBoundaries]);

      const meteorites = new FeatureLayer({
        url: "https://services3.arcgis.com/x7zwOVxCks2KYCg6/arcgis/rest/services/NASA_meteorites/FeatureServer",
        title: "meteorites",
      });

      webscene.addMany([meteorites]);
    }
  }
});

