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