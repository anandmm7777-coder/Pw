// =====================================
// JEE Rank Tracker Pro
// Admin Panel JS
// P9.1C
// =====================================



// ===============================
// Storage Keys
// ===============================

let chapters =

JSON.parse(

localStorage.getItem("chapters")

) || [];



let lectures =

JSON.parse(

localStorage.getItem("lectures")

) || [];





// ===============================
// Elements
// ===============================


const chapterName =
document.getElementById("chapterName");


const chapterSubject =
document.getElementById("chapterSubject");


const addChapterBtn =
document.getElementById("addChapterBtn");



const lectureChapter =
document.getElementById("lectureChapter");


const lectureTitle =
document.getElementById("lectureTitle");


const lectureDuration =
document.getElementById("lectureDuration");


const lectureVideo =
document.getElementById("lectureVideo");


const lectureNotes =
document.getElementById("lectureNotes");


const addLectureBtn =
document.getElementById("addLectureBtn");



const lectureTable =
document.getElementById("lectureTable");





// ===============================
// Add Chapter
// ===============================


addChapterBtn.onclick = function(){


    const name =
    chapterName.value.trim();


    const subject =
    chapterSubject.value;



    if(!name || subject==="Select Subject"){

        alert("Fill all chapter details");

        return;

    }



    const chapter = {


        id:Date.now(),


        name:name,


        subject:subject



    };



    chapters.push(chapter);



    localStorage.setItem(

        "chapters",

        JSON.stringify(chapters)

    );



    chapterName.value="";


    loadChapters();


    updateCounts();


};








// ===============================
// Load Chapters Dropdown
// ===============================


function loadChapters(){


    lectureChapter.innerHTML = `

    <option>

    Select Chapter

    </option>

    `;



    chapters.forEach(chapter=>{


        lectureChapter.innerHTML += `

        <option value="${chapter.id}">

        ${chapter.name}

        </option>

        `;


    });


}








// ===============================
// Add Lecture
// ===============================


addLectureBtn.onclick=function(){



    const chapterId =

    Number(lectureChapter.value);



    const title =

    lectureTitle.value.trim();



    if(!chapterId || !title){


        alert("Fill lecture details");


        return;


    }




    const lecture = {


        id:Date.now(),


        chapterId:chapterId,


        title:title,


        duration:

        lectureDuration.value || "45 min",



        video:

        lectureVideo.value,



        notes:

        lectureNotes.value



    };



    lectures.push(lecture);



    localStorage.setItem(

        "lectures",

        JSON.stringify(lectures)

    );



    clearLectureForm();


    renderLectures();


    updateCounts();


};







// ===============================
// Render Lecture Table
// ===============================


function renderLectures(){


    lectureTable.innerHTML="";



    lectures.forEach((lecture,index)=>{



        const chapter =

        chapters.find(

        c=>c.id===lecture.chapterId

        );



        lectureTable.innerHTML += `


        <tr>


        <td>

        ${index+1}

        </td>



        <td>

        ${lecture.title}

        </td>



        <td>

        ${chapter ? chapter.name : "Unknown"}

        </td>



        <td>


        <button onclick="deleteLecture(${lecture.id})">

        Delete

        </button>


        </td>



        </tr>


        `;



    });



}








// ===============================
// Delete Lecture
// ===============================


function deleteLecture(id){



    lectures = lectures.filter(

        lecture =>

        lecture.id !== id

    );



    localStorage.setItem(

        "lectures",

        JSON.stringify(lectures)

    );



    renderLectures();


    updateCounts();



}







// ===============================
// Clear Form
// ===============================


function clearLectureForm(){


    lectureTitle.value="";

    lectureDuration.value="";

    lectureVideo.value="";

    lectureNotes.value="";


}







// ===============================
// Update Counts
// ===============================


function updateCounts(){



    document.getElementById(

    "totalSubjects"

    ).textContent =

    new Set(

    chapters.map(c=>c.subject)

    ).size;




    document.getElementById(

    "totalChapters"

    ).textContent =

    chapters.length;



    document.getElementById(

    "totalLectures"

    ).textContent =

    lectures.length;



}






// ===============================
// Start
// ===============================


window.addEventListener(

"load",

()=>{


    loadChapters();


    renderLectures();


    updateCounts();


});
