(function () {
    angular
        .module("FileUpload")
        .controller("LoginController", LoginController);

    function LoginController($location, ArtistService) {
        var vm = this;
        vm.login = login;

            function login(username, password){
                ArtistService
                .login(username, password)
                .then(
                    function(response){
                        var artist = response.data;
                        console.log(artist);
                        if(user){
                            $location.url("/artist/"+ artist._id);

                        }
                    },
                    function(error) {
                        vm.error = error;
                    }
                );
            //.catch(errorHandler);

        }
        //var errorHandler = function (error) {
        //    swal("Error", "User not found", 'error');
        //};
    }
})();