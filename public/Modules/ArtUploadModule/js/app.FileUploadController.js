(function() {
  angular.module("FileUpload").controller('FileUploadController', FileUploadController);

  FileUploadController.$inject = ['FileService'];

  function FileUploadController (fileService) {

    var self = this;

    self.artType = ['Contemporary', 'Charcoal-sketch', 'Water-Color', 'Oil Painting', 'Mural',
      'Crafts', 'Knife Painting'];

    self.uploadArt = uploadArt;
    self.cancel = cancel;

    init();

    function init() {
      self.form = {
        artName : 'Lorem Ipsum',
        artType : 'Water-Color',
        creationDate : new Date(),
        availableDateOfPurchase : new Date(),
        description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut " +
        "labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut " +
        "aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum " +
        "dolore eu fugiat nulla pariatur."
      }
    }

    function uploadArt() {
      var formData = new FormData( document.getElementById("fileUploadForm"));
      formData.append("artData", JSON.stringify(self.form));
      fileService.uploadArt(formData).then(function(response) {
        if (!response.status) {
          swal("Success", "The art was successfully saved in your database.", "success");
        } else {
          swal("Error", "The art was failed to save, please try again later", "error");
        }
      });
    }

    function cancel() {
      self.form = {};
    }

  }

})();