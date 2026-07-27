// ======================================
// Dashboard Update
// ======================================

let chapters = JSON.parse(localStorage.getItem("chapters")) || [];
let lectures = JSON.parse(localStorage.getItem("lectures")) || [];
let completedLectures = JSON.parse(localStorage.getItem("completedLectures")) || [];

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------
    // Circle Progress
    // -------------------------

    let progress = calculateProgress();

    let circle = document.querySelector(".circle-progress");
    let circleText = document.querySelector(".circle-progress span");

    if(circle){
        circle.style.background =
        `conic-gradient(#2563eb ${progress}%, #e2e8f0 0)`;
    }

    if(circleText){
        circleText.innerHTML = progress + "%";
    }

    // -------------------------
    // History
    // -------------------------

    let data = loadData();
    console.log("Progress History:", data.progressHistory);

    // -------------------------
    // Subject Progress
    // -------------------------

    updateSubjectProgress("Physics","physics");
    updateSubjectProgress("Chemistry","chemistry");
    updateSubjectProgress("Mathematics","math");

    // -------------------------
    // Journey Progress
    // -------------------------

    updateJourneyProgress();

});


// ======================================
// Subject Progress
// ======================================

function updateSubjectProgress(subject,prefix){

    let subjectChapters = chapters.filter(
        ch => ch.subject === subject
    );

    let total = subjectChapters.length;

    let completed = 0;

    subjectChapters.forEach(ch=>{

        let done = lectures.some(
            lecture =>
            lecture.chapterId === ch.id &&
            completedLectures.includes(lecture.id)
        );

        if(done){
            completed++;
        }

    });

    let percent = total > 0
    ? Math.round((completed/total)*100)
    : 0;

    let text = document.getElementById(prefix+"Text");
    let bar = document.getElementById(prefix+"Bar");
    let percentText = document.getElementById(prefix+"Percent");

    if(text){
        text.innerHTML =
        `${completed} / ${total} Chapters`;
    }

    if(bar){
        bar.style.width = percent+"%";
    }

    if(percentText){
        percentText.innerHTML = percent+"%";
    }

}



// ======================================
// Journey Progress
// ======================================

function updateJourneyProgress(){

    let total = lectures.length;

    let completed = completedLectures.length;

    let percent = total > 0
    ? Math.round((completed/total)*100)
    : 0;

    let fill =
    document.getElementById("journeyFill");

    let marker =
    document.getElementById("progressMarker");

    let text =
    document.getElementById("progressText");

    if(fill){
        fill.style.width = percent+"%";
    }

    if(marker){
        marker.style.left = percent+"%";
    }

    if(text){
        text.innerHTML =
        `${completed} / ${total} Lectures Completed (${percent}%)`;
    }

}