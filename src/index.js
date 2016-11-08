angular
  .module('app', ['ui.router', 'chart.js'])
  .config(function (ChartJsProvider) {
    ChartJsProvider
      .setOptions({
        colors: [
          '#cf4646',
          '#00ADF9',
          '#DCDCDC',
          '#46BFBD',
          '#FDB45C',
          '#949FB1',
          '#4D5360']
      });
  });
