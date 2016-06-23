(function(){
    angular
        .module("art")
        .controller("BlogNewController", BlogNewController);

    function BlogNewController($location, $routeParams, BlogService) {
        var vm = this;
        vm.artistId = $routeParams.artistId;

        vm.createWidget = createWidget;

        function createWidget(BlogType) {
            var newBlog = {
                // _id: (new Date().getTime() + ""),
                type: BlogType,
                _artist: vm.artistId,
                name: "Default"
            };
            BlogService
                .createBlog(newBlog)
                .then(function (response) {
                    var blog = response.data;
                    if (blog) {
                        $location.url("/artist/" + vm.artistId + "/blog/" + blog._id);
                    } else {
                        vm.error = "Unable to create the blog";
                    }
                });
        }
    }
})();