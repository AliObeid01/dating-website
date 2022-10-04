workshop_pages.baseURL = "http://127.0.0.1:8000/api/v1";

workshop_pages.Console = (title, values, oneValue = true) => {
    console.log('---' + title + '---');
    if(oneValue){
        console.log(values);
    }else{
        for(let i =0; i< values.length; i++){
            console.log(values[i]);
        }
    }
}

//fetch the login api
workshop_pages.postAPI_login = async (api_url, api_data) => {
    const validate=document.getElementById('error');
    try{
        return await axios.post(
            api_url,
            api_data
        ).then(function (response) {
          localStorage.setItem("token", response.data.access_token);  
          localStorage.setItem("id", response.data.user.id);
          window.location.href = "landingpage.html";
        });
    }catch(error){
        validate.innerHTML= error.response.data.message;
    }
}

//fetch the register api
workshop_pages.postAPI_Register = async (api_url, api_data) => {
    const validate=document.getElementById('error');
    try{
        return await axios.post(
            api_url,
            api_data
        ).then(function (){
          window.location.href = "login.html";
        });  
    }catch(error){
        validate.innerHTML= JSON.stringify(error.response.data);
    }
}

//fetch the feed api
workshop_pages.getAPI_feed = async (api_url,token) => {
    try{
        return await axios.get(
            api_url,
            { headers:{
                     "Authorization" : "Bearer " + token
                }
            }
        ).then(function (response){
        let user=document.getElementById('user');
        for (let i = 0; i < response.data.data.length; i++) {
            user.innerHTML+=`<div id="${response.data.data[i].id}" class="card-container">
            <img id="img" class="round" src=""/>
            <h3 id="name">${response.data.data[i].name}</h3>
            <h4 id="email">${response.data.data[i].email}</h4>
            <h4 id="gender">gender: ${response.data.data[i].gender}</h4>
            <h4 id="interested">Interested in: ${response.data.data[i].interested}</h4>
            <h4 id="location">Adress: ${response.data.data[i].location}</h4>
            <h4 id="bio">Bio: ${response.data.data[i].bio}</h4> <br/> <h4 id="dob">Date of Birth:${response.data.data[i].dob}</h4>
            <div class="buttons">
               <button id="msg" class="primary" onclick="location.href='message.html?id=${response.data.data[i].id}';">
                Message
              </button>
              <button  class="primary ghost" onclick=workshop_pages.favorite(${response.data.data[i].id})>
               Favorite
              </button>
              <button  class="primary ghost" onclick=workshop_pages.block(${response.data.data[i].id})>
               Block
             </button>
            </div>
          </div>`
        }
        });
    }catch(error){
        workshop_pages.Console("Error from GET API",  error);
    }
}

//fetch the user information api
workshop_pages.getAPI_user = async (api_url,token) => {
    try{
        return await axios.get(
            api_url,
            { headers:{
                     "Authorization" : "Bearer " + token
                }
            }
        ).then(function (response){
        let userProfile=document.getElementById('user');
        userProfile.innerHTML=`
             <h1>Profile</h1><br>
            <img id="img" class="round" src=""/>
            <h3 id="name">${response.data.name}</h3>
            <h4 id="email">${response.data.email}</h4>
            <h4 id="gender">gender: ${response.data.gender}</h4>
            <h4 id="interested">Interested in: ${response.data.interested}</h4>
            <h4 id="location">Adress: ${response.data.location}</h4>
            <h4 id="bio">Bio: ${response.data.bio}</h4> <br/> <h4 id="dob">Date of Birth:${response.data.dob}</h4>
          `
        });
    }catch(error){
        workshop_pages.Console("Error from GET API",  error);
    }
}

//fetch favorite a user api
workshop_pages.postAPI_favorite = async (api_url,api_data,token) => {
    try{
        return await axios.post(
            api_url,
            api_data,
            { headers:{
                     "Authorization" : "Bearer " + token
                }
            }
        )
    }catch(error){
        workshop_pages.Console("Error from favorite API",  error);
    }
}

//fetch get favorites api
workshop_pages.getAPI_favorites = async () => {
    let token = localStorage.getItem("token");
    const favorites_url = `${workshop_pages.baseURL}/favorites`;
    try{
        return await axios.get(
            favorites_url,
            { headers:{
                     "Authorization" : "Bearer " + token
                }
            }
        ).then(function (response){
        let favorites=document.getElementById('favorites');
        for (let i = 0; i < response.data.length; i++) {
           favorites.innerHTML+=`
           <p>${response.data[i].name}--location:${response.data[i].location}<p>`
        }
        });
    }catch(error){
        workshop_pages.Console("Error from GET API",  error);
    }
}

//fetch get favoriteby api
workshop_pages.getAPI_favoriteBy = async () => {
    let token = localStorage.getItem("token");
    const favorites_url = `${workshop_pages.baseURL}/favoriteby`;
    try{
        return await axios.get(
            favorites_url,
            { headers:{
                     "Authorization" : "Bearer " + token
                }
            }
        ).then(function (response){
        let favoritby=document.getElementById('favoritby');
        for (let i = 0; i < response.data.length; i++) {
            favoritby.innerHTML+=`
            <p>${response.data[i].name}--location:${response.data[i].location}<p>`
        }
        });
    }catch(error){
        workshop_pages.Console("Error from GET API",  error);
    }
}

//fetch get sented messages api
workshop_pages.getAPI_MessagesSent = async () => {
    let token = localStorage.getItem("token");
    const Sent_url = `${workshop_pages.baseURL}/user-SendMessages`;
    try{
        return await axios.get(
            Sent_url,
            { headers:{
                     "Authorization" : "Bearer " + token
                }
            }
        ).then(function (response){
        let sent=document.getElementById('sent');
        for (let i = 0; i < response.data.length; i++) {
            sent.innerHTML+=`
           <p>${response.data[i].message}<p>`
        }
        });
    }catch(error){
        workshop_pages.Console("Error from GET API",  error);
    }
}

//fetch get recieved messages api
workshop_pages.getAPI_MessagesRecieved = async () => {
    let token = localStorage.getItem("token");
    const Recieved_url = `${workshop_pages.baseURL}/user-RecievedMessages`;
    try{
        return await axios.get(
            Recieved_url,
            { headers:{
                     "Authorization" : "Bearer " + token
                }
            }
        ).then(function (response){
        let recieved=document.getElementById('recieved');
        for (let i = 0; i < response.data.length; i++) {
            recieved.innerHTML+=`
            <p>${response.data[i].message}<p>`
        }
        });
    }catch(error){
        workshop_pages.Console("Error from GET API",  error);
    }
}

//fetch block user api
workshop_pages.postAPI_block= async (api_url,api_data,token) => {
    try{
        return await axios.post(
            api_url,
            api_data,
            { headers:{
                     "Authorization" : "Bearer " + token
                }
            }
        )
    }catch(error){
        workshop_pages.Console("Error from Block API",  error);
    }
}

//fetch message a user api
workshop_pages.postAPI_message = async (api_url,api_data,token) => {
    const msg=document.getElementById('msg-sent');
    try{
        return await axios.post(
            api_url,
            api_data,
            { headers:{
                     "Authorization" : "Bearer " + token
                }
            }
        ).then(function (response){
            msg.innerHTML=response.data.data;    
        });
    }catch(error){
        workshop_pages.Console("Error from Message API",  error);
    }
}

//fetch update user information api
workshop_pages.postAPI_Update = async (api_url,api_data,token) => {
    const msg=document.getElementById('updatemsg');
    try{
        return await axios.post(
            api_url,
            api_data,
            { headers:{
                     "Authorization" : "Bearer " + token
                }
            }
        ).then(function (response){
            msg.innerHTML=response.data.message; 
        });
    }catch(error){
        workshop_pages.Console("Error from Update API",  error);
    }
}

workshop_pages.UpdateProfile = async (api_data) => {
    let token = localStorage.getItem("token");
    const register_url = `${workshop_pages.baseURL}/update-profile`;
    const response_update = workshop_pages.postAPI_Update(register_url,api_data,token);
    workshop_pages.Console("Testing Update API", response_update);   
}

workshop_pages.favorite = async (favorite_id) => {
    let card=document.getElementById(favorite_id)
    let token = localStorage.getItem("token");
    const favorite_url = `${workshop_pages.baseURL}/favorite-user`;
    const api_data={favorite_id:favorite_id};
    const response_favorite = workshop_pages.postAPI_favorite(favorite_url,api_data,token);
    workshop_pages.Console("Testing favorite API", response_favorite);
    card.remove();
}