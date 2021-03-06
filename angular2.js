require('es6-shim');
require('reflect-metadata');
require('zone.js');

var Angular2 = {
  core: require('angular2/core'),
  router: require('angular2/router'),
  change_detection: require('angular2/src/core/change_detection/change_detection'),
  differs: [
    require('angular2/src/core/change_detection/differs/default_iterable_differ'),
    require('angular2/src/core/change_detection/differs/iterable_differs')],
  facade: require('angular2/src/core/facade/async')
};

function register(module, exportFn) {
  var modules = _.isArray(module) ? module : [module]; 
  return {
    setters: [],
    execute: function() {
      for (var i = 0; i < modules.length; i++) {
        var module = modules[i];
        for (var exportName in module) {
          exportFn(exportName, module[exportName]);
        }
      }
    }
  };
}

System.register('angular2/angular2', [], function(exportFn) {
  return register(Angular2.core, exportFn);
});

System.register('angular2/router', [], function(exportFn) {
  return register(Angular2.router, exportFn);
});

System.register('angular2/change_detection', [], function(exportFn) {
  return register(_.flatten([Angular2.change_detection, Angular2.differs]), exportFn);
});

System.register('angular2/facade', [], function(exportFn) {
  return register(Angular2.facade, exportFn);
});
