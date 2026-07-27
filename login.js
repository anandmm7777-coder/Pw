import { db } from "./firebase-config.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// ===========================
// ELEMENTS
// ===========================

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");
const googleLogin = document.getElementById("googleLogin");
const forgotPassword = document.getElementById("forgotPassword");
const togglePassword = document.getElementById("togglePassword");


// ===========================
// SHOW / HIDE PASSWORD
// ===========================

togglePassword.addEventListener("click", () => {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.innerHTML = "🙈";
    } else {
        password.type = "password";
        togglePassword.innerHTML = "👁";
    }

});


// ===========================
// EMAIL LOGIN
// ===========================

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    try {

        await signInWithEmailAndPassword(
            auth,
            email.value.trim(),
            password.value
        );

        message.style.color = "#22c55e";
        message.innerHTML = "Login Successful ✅";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } catch (error) {

        message.style.color = "#ef4444";
        message.innerHTML = error.message;

    }

});
await signInWithEmailAndPassword(
    auth,
    email.value.trim(),
    password.value
);

localStorage.setItem("isLoggedIn", "true");

message.style.color = "#22c55e";
message.innerHTML = "Login Successful ✅";

setTimeout(() => {
    window.location.href = "profile.html";
}, 1000);

// ===========================
// GOOGLE LOGIN
// ===========================

googleLogin.addEventListener("click", async () => {

    try {

        const provider = new GoogleAuthProvider();

        provider.setCustomParameters({
            prompt: "select_account"
        });

        await signInWithPopup(auth, provider);

        message.style.color = "#22c55e";
        message.innerHTML = "Google Login Successful ✅";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);

    } catch (error) {

        console.log(error);

        message.style.color = "#ef4444";
        message.innerHTML = error.code;

    }

});

await signInWithPopup(auth, provider);

localStorage.setItem("isLoggedIn", "true");

message.style.color = "#22c55e";
message.innerHTML = "Google Login Successful ✅";

setTimeout(() => {
    window.location.href = "profile.html";
}, 1000);
// ===========================
// FORGOT PASSWORD
// ===========================

forgotPassword.addEventListener("click", async (e) => {

    e.preventDefault();

    if (email.value.trim() === "") {

        message.style.color = "#ef4444";
        message.innerHTML = "Enter your email first";
        return;

    }

    try {

        await sendPasswordResetEmail(
            auth,
            email.value.trim()
        );

        message.style.color = "#22c55e";
        message.innerHTML = "Password reset email sent ✅";

    } catch (error) {

        message.style.color = "#ef4444";
        message.innerHTML = error.message;

    }

});


// ===========================
// AUTH STATE
// ===========================

onAuthStateChanged(auth, (user) => {

    if (user) {
        console.log("Logged In:", user.email);
    }

});
