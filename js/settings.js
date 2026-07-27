// =====================================
// JEE Rank Tracker Pro
// settings.js
// P10.1C
// =====================================

// ----------------------
// Elements
// ----------------------

const darkMode = document.getElementById("darkMode");

if(darkMode){

    darkMode.checked =
    localStorage.getItem("darkMode") === "true";

    darkMode.addEventListener("change", function(){

        if(this.checked){

            localStorage.setItem("darkMode","true");

        }else{

            localStorage.setItem("darkMode","false");

        }

        location.reload();

    });

}
const studentName =
document.getElementById("studentName");



// ----------------------
// Load Settings
// ----------------------

function loadSettings(){

    const settings =

    JSON.parse(

        localStorage.getItem("appSettings")

    ) || {};



    // Dark Mode

    if(settings.darkMode){

        darkMode.checked = true;

        document.body.classList.add("dark");

    }



    // Student Name

    if(settings.studentName){

        studentName.textContent =

        settings.studentName;

    }

}



// ----------------------
// Save Settings
// ----------------------

function saveSettings(){

    const settings =

    JSON.parse(

        localStorage.getItem("appSettings")

    ) || {};



    settings.darkMode =

    darkMode.checked;



    settings.studentName =

    studentName.textContent;



    localStorage.setItem(

        "appSettings",

        JSON.stringify(settings)

    );

}



// ----------------------
// Dark Mode
// ----------------------

darkMode.addEventListener(

"change",

function(){

    document.body.classList.toggle(

        "dark"

    );



    saveSettings();

});



// ----------------------
// Edit Profile Name
// ----------------------

studentName.addEventListener(

"click",

function(){

    const name = prompt(

        "Enter Student Name",

        studentName.textContent

    );



    if(name && name.trim()!=""){

        studentName.textContent =

        name.trim();



        saveSettings();

    }

});



// ----------------------
// Export Data
// ----------------------

function exportData(){

    const data = {};



    for(let i=0;

        i<localStorage.length;

        i++){

        const key =

        localStorage.key(i);



        data[key] =

        localStorage.getItem(key);

    }



    const blob = new Blob(

        [

            JSON.stringify(

                data,

                null,

                2

            )

        ],

        {

            type:

            "application/json"

        }

    );



    const a =

    document.createElement("a");



    a.href =

    URL.createObjectURL(blob);



    a.download =

    "jee_tracker_backup.json";



    a.click();

}



// ----------------------
// Import Data
// ----------------------

function importData(){

    const input =

    document.createElement("input");



    input.type = "file";



    input.accept = ".json";



    input.onchange = function(e){

        const file =

        e.target.files[0];



        if(!file) return;



        const reader =

        new FileReader();



        reader.onload = function(){

            const data =

            JSON.parse(

                reader.result

            );



            Object.keys(data)

            .forEach(key=>{

                localStorage.setItem(

                    key,

                    data[key]

                );

            });



            alert(

            "Backup Restored Successfully"

            );



            location.reload();

        };



        reader.readAsText(file);

    };



    input.click();

}



// ----------------------
// Reset All Data
// ----------------------

function resetApp(){

    if(

        confirm(

        "Delete all saved data?"

        )

    ){

        localStorage.clear();

        alert(

        "All Data Deleted"

        );

        location.reload();

    }

}



// ----------------------
// Connect Setting Items
// ----------------------

document

.querySelectorAll(".setting-item")

.forEach(item=>{

    const text =

    item.innerText;



    if(text.includes("Export")){

        item.onclick = exportData;

    }



    if(text.includes("Import")){

        item.onclick = importData;

    }



    if(text.includes("Reset")){

        item.onclick = resetApp;

    }

});



// ----------------------
// Start
// ----------------------

window.onload = function(){

    loadSettings();

};
const profilePicker =
document.getElementById("profilePicker");

const profileImage =
document.getElementById("profileImage");

const savedImage =
localStorage.getItem("profileImage");

if(savedImage){
    profileImage.src = savedImage;
}

profilePicker.addEventListener("change", function(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(){

        profileImage.src = reader.result;

        localStorage.setItem(
            "profileImage",
            reader.result
        );

    };

    reader.readAsDataURL(file);

});