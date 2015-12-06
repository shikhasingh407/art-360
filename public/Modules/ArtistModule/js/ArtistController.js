(function () {
  angular.module("FileUpload").controller('ArtistController', ArtistController);

  ArtistController.$inject = ['ArtistService', '$filter'];

  function ArtistController(artistService) {
    var self = this;

    self.artist = {};

    self.postOrUpdateArtist = postOrUpdateArtist;
    self.getArtist = getArtist;
    self.disableArtist = disableArtist;

    function postOrUpdateArtist() {
      var fd = new FormData();
      if (self.artist.hasOwnProperty('length') && self.artist.length > 0) {
        fd.append('artistData', JSON.stringify(self.artist[0]));
      } else {
        fd.append('artistData', JSON.stringify(self.artist));
      }
      if (!self.artist['_id']) {
        artistService.postArtistInformation(fd).then(responseHandler);
      } else {
        artistService.updateArtistInformation(fd).then(responseHandler);
      }

      function responseHandler(response) {
        if (!response.status) {
          self.artist = response;
          swal("Success", "Your data was saved successfully", "success");
        } else {
          swal("Error", "Couldn't save the data : " + response, "error");
        }
      }
    }

    function getArtist(email) {
      artistService.getArtist(email).then(function (response) {
        if (!response.status) {
          if (self.artist.hasOwnProperty('length') && self.artist.length > 0) {
            self.artist = response[0];
          } else
            self.artist = response;
          if (self.artist['dob']) {
            self.artist['dob'] = new Date(self.artist['dob']);
          }
        } else {
          swal("Error", "Artist not found", "error");
        }
      });
    }

    function disableArtist() {

    }

  }

})();