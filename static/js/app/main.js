// we use define instead of require when we create a module
define([
  "esri/WebScene",
  "esri/views/SceneView",
  "esri/layers/FeatureLayer",
  "esri/layers/support/LabelClass"
], function (WebScene, SceneView, FeatureLayer, LabelClass) {

  // the module exports an object with an init method
  // init creates the web scene and the view
  return {

    init: function() {

      // the web scene is the data model: it contains the basemap, the ground and the layers
      const webscene = new WebScene({
        basemap: "topo"
      });

      // the view is the visual representation of the web scene
      const view = new SceneView({
        container: "view",
        map: webscene
      });

      // setting the view as a global object is useful for debugging
      window.view = view;

    }
  }
});