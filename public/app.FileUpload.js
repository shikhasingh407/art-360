(function () {
  angular
      .module("FileUpload", ['ngAnimate', 'ngMaterial', 'ui.bootstrap', 'ngRoute'])
      .config(function ($mdThemingProvider) {
        // Extend the red theme with a few different colors
        var bootstrapPrimaryMap = $mdThemingProvider.extendPalette('blue', {
          '500': '337ab7'
        });

        //var bootstrapWarningMap = $mdThemingProvider.extendPalette('yellow', {
        //    '400': 'faebcc'
        //});
        //
        //var bootstrapDangerMap = $mdThemingProvider.extendPalette('pink', {
        //    '400': 'ebccd1'
        //});
        //
        //var bootstrapDefaultMap = $mdThemingProvider.extendPalette('grey', {
        //    '400': 'ddd'
        //});

        $mdThemingProvider.definePalette('bootstrapPrimary', bootstrapPrimaryMap);
        //$mdThemingProvider.definePalette('bootstrapWarning', bootstrapWarningMap);
        //$mdThemingProvider.definePalette('bootstrapDanger', bootstrapDangerMap);
        //$mdThemingProvider.definePalette('bootstrapDefault', bootstrapDefaultMap);

        $mdThemingProvider.theme('default')
            .primaryPalette('bootstrapPrimary');
        //.warnPalette('bootstrapWarning')
        //.accentPalette('bootstrapDanger')
        //.backgroundPalette('bootstrapDefault')
      })
      .config(['$routeProvider',
        function ($routeProvider) {
          $routeProvider
              .when("/", {
                  templateUrl: "Modules/ArtistModule/Login.html",
                  controller: "LoginController",
                  controllerAs: "model"
              })
              .when("/login", {
                templateUrl: "Modules/ArtistModule/Login.html",
                controller: "LoginController",
                controllerAs: "model"
              })
              //.when("/NewArtist", {
              //  templateUrl: "Modules/ArtistModule/NewArtist.html",
              //  controller: "ArtistController",
              //  controllerAs: "artistCtrl"
              //})
              .when("/artist/:id", {
                templateUrl: "Modules/home.html",
                //controller: "ProfileController",
                controllerAs: "model"
              })

              .
          when('/art', {
            templateUrl: 'Modules/ArtUploadModule/UploadForm.html',
            controller: 'FileUploadController',
            controllerAs: 'uploadCtrl'
          }).
          when('/art/list', {
            templateUrl: 'Modules/ArtListModule/listArt.html',
            controller: 'ListArtController',
            controllerAs: 'listCtrl'
          }).when('/artist', {
            templateUrl: 'Modules/ArtistModule/NewArtist.html',
            controller: 'ArtistController',
            controllerAs: 'artistCtrl'
          }).
          otherwise({
            redirectTo: 'public/index.html'
          });
        }]);

})();