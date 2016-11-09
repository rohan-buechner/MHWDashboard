angular
  .module('app', ['ui.router', 'chart.js', 'mgcrea.ngStrap'])
  .config(function (ChartJsProvider) {
    ChartJsProvider.setOptions({
      colors: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360']
    });
    ChartJsProvider.setOptions('bubble', {
      tooltips: {enabled: false}
    });
  });
