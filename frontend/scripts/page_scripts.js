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