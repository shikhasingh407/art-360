(function () {
  angular.module("FileUpload").factory('ArtistService', ArtistService);

  ArtistService.$inject = ['$http'];

  function ArtistService($http) {

    var service = {
      postArtistInformation : postArtistInformation,
      updateArtistInformation: updateArtistInformation,
      getArtist : getArtist
    };

    function postArtistInformation(formData) {
      return $http.post("/rest/artists", formData, {
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      }).then(successfulProcess).catch(failedProcess);
    }

    function updateArtistInformation(formData) {
      return $http.put("/rest/artists", formData, {
        headers: {
          'Content-Type': undefined
        },
        transformRequest: angular.identity
      }).then(successfulProcess).catch(failedProcess);
    }

    function getArtist(name) {
      return $http.get("/rest/artists/"+ name).then(successfulProcess).catch(failedProcess);
    }

    function successfulProcess(response) {
      if (response.data.length > 0)
        return response.data[0];
      else
        return response.data;
    }

    function failedProcess(error) {
      return error;
    }



    return service;
  }

})();