describe('tech component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('gaugeWidget', function () {
      return {
        templateUrl: 'app/dashboard/gauge.html'
      };
    });
  }));
  it('should render Gulp', angular.mock.inject(function ($rootScope, $compile) {
    var $scope = $rootScope.$new();
    $scope.fixture = {
      key: 'gulp',
      title: 'Gulp',
      logo: 'http://fountainjs.io/assets/imgs/gulp.png',
      text1: 'The streaming build system',
      text2: 'Automate and enhance your workflow'
    };
    var element = $compile('<gauge-widget gauge="fixture"></gauge-widget>')($scope);
    $scope.$digest();
    var gauge = element.find('h3');
    expect(gauge.html().trim()).toEqual('Gulp');
  }));
});
