var dafneApi = {
  API_URL: "http://localhost:3001",
  /*
   * Gets current logged in user
   */
  getMe(){
    return fetch(dafneApi.API_URL+'/users/me',{
      method:"GET",
      credentials:"include"
    })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) =>{
      return error;
    });
  },
  /*
   * Gets current logged in user
   */
  getPerspectives(){
    return fetch(dafneApi.API_URL+'/perspectives',{
      method:"GET",
      credentials:"include"
    })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) =>{
      return error;
    });
  },
  getPerspective(perspectiveId){
    return fetch(`${dafneApi.API_URL}/perspectives/${perspectiveId}`,{
      method:"GET",
      credentials:"include"
    })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) =>{
      return error;
    });
  },
  /*
   * Creates a login request
   */
  login(email,password){
    let params = {
        'email': email,
        'password':password
    };
    let formBody = [];
    for (let property in params) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return fetch(dafneApi.API_URL+'/users/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      return error;
    });
  },
  /*
   * Logouts the current user
   */
  logout(){
    return fetch(dafneApi.API_URL+'/users/logout',{
      method:"GET",
      credentials:"include"
    })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) =>{
      return error;
    });
  },
  /*
   * Creates a login request
   */
  createPerspective(name,filter,mode,showScales,hiddenPathwaysIndexes){
    let params = {
        'name'       : name,
        'filter'     : filter,
        'mode'       : mode,
        'showScales' : showScales,
        'hiddenPathwaysIndexes' : hiddenPathwaysIndexes

    };
    let formBody = [];
    for (let property in params) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return fetch(dafneApi.API_URL+'/perspectives/create', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      return error;
    });
  },
  /*
   * Marks a new favourite
   */
  addFavourite(pathway_index,pathway_name){
    let params = {
        'pathway_index' : pathway_index,
        'pathway_name'  : pathway_name,
    };
    let formBody = [];
    for (let property in params) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return fetch(dafneApi.API_URL+'/favourites/add', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      return error;
    });
  },
  /*
   * Removes a favourite
   */
  removeFavourite(pathway_index,pathway_name){
    let params = {
        'pathway_index' : pathway_index,
        'pathway_name'  : pathway_name,
    };
    let formBody = [];
    for (let property in params) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(params[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return fetch(dafneApi.API_URL+'/favourites/remove', {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
      credentials: 'include'
    })
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson;
    })
    .catch((error) => {
      return error;
    });
  },
  /*
   * Gets current logged in user
   */
  getAllFavourites(){
    return fetch(dafneApi.API_URL+'/favourites/',{
      method:"GET",
      credentials:"include"
    })
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) =>{
      return error;
    });
  },
}
module.exports = dafneApi;
