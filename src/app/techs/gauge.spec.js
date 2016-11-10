describe('tech component', function () {
  beforeEach(module('app', function ($provide) {
    $provide.factory('fountainGauge', function () {
      return {
        templateUrl: 'app/techs/gauge.html'
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
    var element = $compile('<fountain-gauge gauge="fixture"></fountain-gauge>')($scope);
    $scope.$digest();
    var gauge = element.find('h3');
    expect(gauge.html().trim()).toEqual('Gulp');
  }));
});
