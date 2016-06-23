(function(){
    angular
        .module("art")
        .controller("PortfolioController", PortfolioController);

    function PortfolioController($routeParams, PortfolioService){
        var vm = this;
        vm.artistId = $routeParams.artistId;
        //vm.userId = $routeParams.userId;
        //vm.websiteId = $routeParams.websiteId;
        //vm.pageId = $routeParams.pageId;

        function init(){
            PortfolioService
                .findPortfolioForArtistId(vm.artistId)
                .then(function(response){
                    vm.websites = response.data;
                });
        }
        init();
    }
})();