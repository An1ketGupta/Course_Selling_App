let user = null

function show_signup(worker){
    if(worker == 'u'){
       user = "user" 
       alert("You selected user.")
    }
    else{
       alert("You selected admin.")
        user = "admin"
    }
    console.log(user)
}

async function signup(){
    let name = document.getElementById("name-input").value 
    let email = document.getElementById("email-input").value 
    let password = document.getElementById("password-input").value 
    let response = null
    if(user == 'user')
        response = await axios.post("http://127.0.0.1:3000/user/signup",{
            name: name,
            email: email,
            password: password
        })
    else{
        response = await axios.post("http://127.0.0.1:3000/admin/signup",{
            name: name,
            email: email,
            password: password
        })
    }
    alert(response.data.message)
}

async function signin(){
    let name = document.getElementById("name-input").value 
    let email = document.getElementById("email-input").value 
    let password = document.getElementById("password-input").value 
    console.log(email + password)
    let response = null
    if(user == 'user')
        response = await axios.post("http://127.0.0.1:3000/user/signin",{
            email: email,
            password: password
        })
    else{
        response = await axios.post("http://127.0.0.1:3000/admin/signin",{
            email: email,
            password: password
        })
    }
    if(response.data.message && response.data.message == "Done"){

    }
    else{
        alert(response.data.message)
    }
}