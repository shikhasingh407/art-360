(function () {
  angular.module("FileUpload").controller('ListArtController', ListArtController);

  ListArtController.$inject = ['FileService'];

  function ListArtController(fileService) {

    var self = this;

    self.arts = [];

    self.getAllArt = getAllArt();

    function getAllArt() {
      fileService.getAllArt('Divyanshi Rastogi').then(
          function (response) {
            if (response instanceof Array) {
              self.arts = response;
            } else {
              self.arts.push(response);
            }
          },
          function (error) {
            swal("Error", "Fetching your art info failed, Please try again later : " + error, "error");
          });
    }
  }

})();