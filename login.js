let submitMode = "SignUp"

function signIn(){
    let signupBtn = document.getElementById(".signupBtn")
    let signinBtn = document.getElementById("signinBtn")
    let nameField = document.getElementById("nameField")
    let title = document.getElementById("title")

    submitMode = "SignIn"

    nameField.style.maxHeight = "0";
    title.innerHTML = "Sign In";
    // signupBtn.classList.add("disable");
    signinBtn.classList.remove("disable");
}

function signUp(){
    let signupBtn = document.getElementById("signupBtn")
    let signinBtn = document.getElementById("signinBtn")
    let nameField = document.getElementById("nameField")
    let title = document.getElementById("title")

    submitMode = "SignUp"

    nameField.style.maxHeight = "60px";
    title.innerHTML = "Sign Up";
    // signupBtn.classList.remove("disable");
    signinBtn.classList.add("disable");
}

function auth(){
    let name = document.getElementById("nameField").value
    var email = document.getElementById("emailField").value.toLowerCase();
    var password = document.getElementById("passwordField").value;
    // console.log("Email: ", email);
    // console.log("Password: ", password);

    if(email == "" || password == ""){
        alert("Please input all information")
        return
    }

    switch(submitMode){
        case "SignUp":
            if(email in DirtyDB.users){
                alert("Email already in use");
                break
            }

            if(name == ""){
                alert("Please input all information")
                return
            }

            DirtyDB.users[email] = {
                "name": name,
                "password": hashString(password),
                "teams": [],
                "invites": [],
                "shifts": [],
            }

            currentUser = email,
            renderDashboard()
            alert("Login Successfully");

            break
        case "SignIn":
            if(email in DirtyDB.users){
                if(hashString(password) == DirtyDB.users[email].password){
                    currentUser = email
                    renderDashboard()
                    alert("Login Successfully");
                }
                else{
                    console.log("Incorrect Password")
                    console.log("input: ", hashString(password), ", wanted: ", DirtyDB.users[email].password)
                    alert("Inavlid Information");
                    return;
                }
            }
            else{
                console.log("Incorrect Username")
                alert("Inavlid Information");
                return;
            }

            break
    }
}


function hashString(input){
    let hash = 0;
    if (input.length == 0){
        return hash;
    }

    for (const char of input) {
        hash ^= char.charCodeAt(0);
    }

    return hash;
}