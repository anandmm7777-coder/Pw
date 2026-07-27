// ===========================
// AUTH STATE MANAGER
// ===========================

import { auth } from "./firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// Login Status Check

onAuthStateChanged(auth,(user)=>{


    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");


    if(user){


        // User Login Hai

        if(loginBtn){

            loginBtn.style.display="none";

        }


        if(logoutBtn){

            logoutBtn.style.display="block";

        }


    }

    else{


        // User Logout Hai


        if(loginBtn){

            loginBtn.style.display="block";

        }


        if(logoutBtn){

            logoutBtn.style.display="none";

        }


    }


});



// ===========================
// LOGOUT FUNCTION
// ===========================


const logoutBtn = document.getElementById("logoutBtn");


if(logoutBtn){


logoutBtn.addEventListener("click",async()=>{


    try{


        await signOut(auth);


        alert("Logout Successfully ✅");


        window.location.href="login.html";


    }
    catch(error){

        console.log(error);

    }


});


}
