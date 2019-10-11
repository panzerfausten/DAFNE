var dafneApi = {
  API_URL: process.env.REACT_APP_API_URL,
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
}
module.exports = dafneApi;
