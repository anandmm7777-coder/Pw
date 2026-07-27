// =====================================
// JEE Rank Tracker Pro
// Add Chapter System
// P9.2C
// =====================================



// ===============================
// Elements
// ===============================


const subjectInput =

document.getElementById(
"chapterSubject"
);



const nameInput =

document.getElementById(
"chapterName"
);



const numberInput =

document.getElementById(
"chapterNumber"
);



const saveBtn =

document.getElementById(
"saveChapterBtn"
);



const message =

document.getElementById(
"message"
);





// ===============================
// Load Existing Chapters
// ===============================


let chapters =

JSON.parse(

localStorage.getItem("chapters")

) || [];







// ===============================
// Save Chapter
// ===============================


saveBtn.addEventListener(

"click",

()=>{


    const subject =

    subjectInput.value;



    const name =

    nameInput.value.trim();



    const number =

    numberInput.value;





    // Validation

    if(
        subject === "" ||
        name === "" ||
        number === ""
    ){


        showMessage(
            "Please fill all details",
            "error"
        );


        return;

    }





    // Duplicate Check


    const exists = chapters.some(

        chapter =>

        chapter.name.toLowerCase()

        ===

        name.toLowerCase()

    );



    if(exists){


        showMessage(

        "Chapter already exists",

        "error"

        );


        return;

    }







    // Create Chapter Object


    const chapter = {


        id:Date.now(),


        subject:subject,


        name:name,


        number:Number(number),


        createdAt:

        new Date().toISOString()


    };






    // Save


    chapters.push(chapter);



    localStorage.setItem(

        "chapters",

        JSON.stringify(chapters)

    );







    showMessage(

        "Chapter Added Successfully",

        "success"

    );





    clearForm();





});








// ===============================
// Clear Form
// ===============================


function clearForm(){


    subjectInput.value="";


    nameInput.value="";


    numberInput.value="";


}








// ===============================
// Message
// ===============================


function showMessage(text,type){


    message.textContent=text;



    if(type==="success"){


        message.style.color="green";


    }

    else{


        message.style.color="red";


    }



    setTimeout(()=>{


        message.textContent="";


    },3000);


}
