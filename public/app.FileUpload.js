(function () {
  angular
      .module("art", ['ngAnimate', 'ngMaterial', 'ui.bootstrap', 'ngRoute'])
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
              .when("/NewArtist", {
                templateUrl: "Modules/ArtistModule/NewArtist.html",
                controller: "ArtistController",
                controllerAs: "artistCtrl"
              })
              .when("/profile", {
                  templateUrl: "Modules/home.html",
                  controller: "ProfileController",
                  controllerAs: "model",
                  resolve: {
                      loggedIn: checkLoggedIn
                  }
              })
              .when("/artist/:artistId", {
                templateUrl: "Modules/home.html",
                controller: "ProfileController",
                  controllerAs: "model",
                  resolve: {
                      loggedIn: checkLoggedIn
                  }
              })

              .when("/artist/:id/portfolio", {
                  templateUrl: "Modules/PortfolioModule/Portfolio.html",
                  controller: "PortfolioController",
                  controllerAs: "portfolioCtrl"
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

            function checkLoggedIn(ArtistService,$location,$q,$rootScope){
                var deferred = $q.defer();
                ArtistService
                    .loggedIn()
                    .then(
                        function(response){
                            var artist=response.data;
                            console.log(artist);
                            if(artist == '0'){
                                $rootScope.currentArtist=null;
                                deferred.reject();
                                $location.url("/login");
                            }
                            else {
                                $rootScope.currentArtist=artist;
                                deferred.resolve();
                            }
                        },
                        function(res){
                            $location.url("/login");
                        }
                    );

                return deferred.promise;
            }
        }]);





})();