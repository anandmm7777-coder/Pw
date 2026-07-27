// ==========================================
// JEE Rank Tracker Pro
// lecture.js
// L1A-1
// ==========================================

// ---------- URL ----------

const params = new URLSearchParams(window.location.search);

const chapterId = Number(params.get("id"));


// ---------- Elements ----------

const lectureList =
document.getElementById("lectureList");

const chapterTitle =
document.getElementById("chapterTitle");

const progressFill =
document.getElementById("progressFill");

const progressText =
document.getElementById("progressText");

const searchInput =
document.getElementById("searchLecture");


// ---------- Data ----------

let lectures = [];

let completed =
JSON.parse(
localStorage.getItem("completedLectures")
) || [];


// ---------- Load Chapter ----------

function loadChapterTitle(){

    const chapters =
    JSON.parse(
        localStorage.getItem("chapters")
    ) || [];

    const chapter =
    chapters.find(
        c => Number(c.id) === chapterId
    );

    if(chapter){

        chapterTitle.textContent =
        chapter.name;

    }else{

        chapterTitle.textContent =
        "Chapter";

    }

}
// ---------- Load Lectures ----------

function loadLectures(){

    let data = localStorage.getItem("lectures");

    console.log("RAW DATA:", data);
    console.log("TYPE:", typeof data);


    try{

     //   lectures = JSON.parse(data);
lectures = (JSON.parse(data) || []).filter(
    lecture => Number(lecture.chapterId) === chapterId
);
        console.log("PARSED DATA:", lectures);

    }
    catch(error){

        console.log("JSON ERROR:", error);

        lectures = [];

    }


    renderLectures();

}

// ==========================================
// Render Lecture Cards
// L1B
// ==========================================

function renderLectures(){

    lectureList.innerHTML = "";


    if(lectures.length === 0){

        lectureList.innerHTML = `

        <div class="empty-state">

            <i class="fa-solid fa-book-open"></i>

            <h3>No Lectures Found</h3>

            <p>Add lectures from Admin Panel.</p>

        </div>

        `;

        updateProgress();

        return;

    }



    lectures.forEach(lecture=>{


        const isCompleted =
        completed.includes(lecture.id);



        lectureList.innerHTML += `


        <div class="lecture-card 
        ${isCompleted ? "completed" : ""}">


            <div class="lecture-header">


                <div class="lecture-check">


                    <input

                    type="checkbox"

                    id="lecture-${lecture.id}"

                    ${isCompleted ? "checked" : ""}

                    onchange="toggleLecture(${lecture.id})">


                    <label for="lecture-${lecture.id}">

                    <span></span>

                    </label>


                </div>



                <div class="lecture-info">


                    <h3 class="lecture-title">

                    ${lecture.title}

                    </h3>



                    <p class="lecture-duration">

                    <i class="fa-regular fa-clock"></i>

                    ${lecture.duration || "45 min"}

                    </p>


                </div>


            </div>



            <div class="lecture-actions">


                <button

                class="video-btn"

                onclick="openVideo('${lecture.video || ""}')">


                <i class="fa-solid fa-play"></i>

                Watch


                </button>




                <button

                class="notes-btn"

                onclick="openNotes('${lecture.notes || ""}')">


                <i class="fa-solid fa-file-lines"></i>

                Notes


                </button>


            </div>


        </div>


        `;


    });


    updateProgress();


}
// ==========================================
// Toggle Lecture Complete
// L2A
// ==========================================

function toggleLecture(id){


    // Already Completed
    if(completed.includes(id)){


        completed = completed.filter(

            lectureId => lectureId !== id

        );


    }

    else{


        // Complete Lecture

        completed.push(id);


        // Save Daily Study

        saveTodayStudy();


    }



    // Save Completed Lectures

    localStorage.setItem(

        "completedLectures",

        JSON.stringify(completed)

    );



    // Update Main Tracker Data

    let data = loadData();



    data.lecturesCompleted =

    completed.length;



    data.xp =

    completed.length * 10;



    data.level =

    Math.floor(data.xp / 500) + 1;



    saveData(data);



    // Update UI

    updateProgress();


    renderLectures();



    // Sync Chapter Progress

    saveChapterProgress();



}
// ==========================================
// Daily Study Save
// ==========================================

function saveTodayStudy(){

    const today =

    new Date().toISOString().split("T")[0];


    let history =

    JSON.parse(

        localStorage.getItem("studyHistory")

    ) || {};



    if(!history[today]){

        history[today] = {

            lectures:0,

            xp:0

        };

    }


    history[today].lectures++;

    history[today].xp += 10;



    localStorage.setItem(

        "studyHistory",

        JSON.stringify(history)

    );

}



// ==========================================
// Chapter Progress Save
// ==========================================

function saveChapterProgress(){


    const total = lectures.length;


    const done = lectures.filter(

        lecture =>

        completed.includes(lecture.id)

    ).length;



    const percent = total === 0

    ? 0

    : Math.round(

        (done / total) * 100

    );



    let chapterProgress =

    JSON.parse(

        localStorage.getItem("chapterProgress")

    ) || {};



    chapterProgress[chapterId] = percent;



    localStorage.setItem(

        "chapterProgress",

        JSON.stringify(chapterProgress)

    );


}
// ==========================================
// Update Chapter Progress Bar
// L2B
// ==========================================

function updateProgress(){

    const total = lectures.length;


    const completedCount = lectures.filter(

        lecture =>

        completed.includes(lecture.id)

    ).length;



    const percent = total === 0

    ? 0

    : Math.round(

        (completedCount / total) * 100

    );



    if(progressFill){

        progressFill.style.width =

        percent + "%";

    }



    if(progressText){

        progressText.textContent =

        percent + "%";

    }

}



// ==========================================
// Open Video
// ==========================================

function openVideo(link){


    if(!link){


        alert(

        "Video not available"

        );


        return;

    }



    window.open(

        link,

        "_blank"

    );

}



// ==========================================
// Open Notes
// ==========================================

function openNotes(link){


    if(!link){


        alert(

        "Notes not available"

        );


        return;

    }



    window.open(

        link,

        "_blank"

    );

}
// ==========================================
// Search Lecture
// L3A
// ==========================================

if(searchInput){

    searchInput.addEventListener(

        "input",

        function(){

            const keyword =

            this.value
            .toLowerCase()
            .trim();



            const cards =

            document.querySelectorAll(

                ".lecture-card"

            );



            cards.forEach(card=>{


                const title =

                card
                .querySelector(".lecture-title")
                .textContent
                .toLowerCase();



                if(title.includes(keyword)){


                    card.style.display = "block";


                }

                else{


                    card.style.display = "none";


                }


            });


        }

    );

}




// ==========================================
// Card Animation
// ==========================================

function animateCards(){


    const cards =

    document.querySelectorAll(

        ".lecture-card"

    );



    cards.forEach((card,index)=>{


        card.style.opacity = "0";


        card.style.transform =

        "translateY(20px)";



        setTimeout(()=>{


            card.style.transition =

            "0.35s ease";



            card.style.opacity = "1";


            card.style.transform =

            "translateY(0)";



        }, index * 70);



    });


}





// ==========================================
// Final Initialization
// ==========================================

window.addEventListener(

"load",

()=>{


    loadChapterTitle();


    loadLectures();


    updateProgress();


});
// ==========================================
// Final Data Sync & Safety
// L3B
// ==========================================


// Refresh All Data

function refreshLecturePage(){

    updateProgress();

    saveChapterProgress();

    renderLectures();

    animateCards();

}



// Check Required Functions

function checkSystem(){


    if(typeof loadData !== "function"){


        console.warn(
            "app.js not loaded"
        );


    }


    if(typeof saveData !== "function"){


        console.warn(
            "saveData missing"
        );


    }


}




// Auto Refresh When Page Visible

document.addEventListener(

"visibilitychange",

()=>{


    if(
        document.visibilityState === "visible"
    ){


        refreshLecturePage();


    }


});





// Start Safety Check

checkSystem();