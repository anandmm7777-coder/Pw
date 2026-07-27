// ===========================
// Chapters System
// Part B-1
// ===========================


// Get Subject From URL

const params = new URLSearchParams(window.location.search);

const currentSubject =
params.get("subject") || "Physics";



// Update Header

const title =
document.getElementById("subjectTitle");

if(title){

title.textContent =
currentSubject + " Chapters";

}



// Chapter Container

const chapterList =
document.getElementById("chapterList");




// Load Chapters

function loadChapters(){


    // First Check LocalStorage

    let chapters =
    JSON.parse(
    localStorage.getItem("chapters")
    );



    // If Empty then Load Default JSON

    if(!chapters){

        fetch("data/chapters.json")

        .then(res=>res.json())

        .then(data=>{

            displayChapters(data);

        });

    }

    else{

        displayChapters(chapters);

    }

}




// Display Chapters

function displayChapters(data){


    chapterList.innerHTML="";



    let filtered =

    data.filter(item=>

    item.subject===currentSubject

    );



    // Empty State

    if(filtered.length===0){

        chapterList.innerHTML=`

        <div class="empty-state">

        <i class="fa-solid fa-book-open"></i>

        <h3>No Chapters Found</h3>

        <p>

        Add chapters from Admin Panel.

        </p>

        </div>

        `;

        return;

    }



    // Next Part Will Create Cards

    filtered.forEach(chapter=>{

        createChapterCard(chapter);

    });

}



// Start

loadChapters();
// ===========================
// Create Chapter Card
// ===========================

function createChapterCard(chapter){

    // Completed Lectures
    const completed =
    JSON.parse(localStorage.getItem("completedLectures")) || [];

    // All Lectures
    const lectures =
    JSON.parse(localStorage.getItem("lectures")) || [];

    // Current Chapter Lectures
    const chapterLectures =
    lectures.filter(
        item => item.chapterId === chapter.id
    );

    const totalLectures = chapterLectures.length;

    // Completed Count
    let completedCount = 0;

    chapterLectures.forEach(lecture => {

        if(completed.includes(lecture.id)){

            completedCount++;

        }

    });

    // Progress %
    let progress = 0;

    if(totalLectures > 0){

        progress = Math.round(
            (completedCount / totalLectures) * 100
        );

    }

    // Card

    chapterList.innerHTML += `

    <div class="chapter-card">

        <div class="chapter-top">

            <div class="chapter-icon">

                <i class="fa-solid fa-book-open"></i>

            </div>

            <div class="chapter-status">

                ${progress}% Complete

            </div>

        </div>


        <div class="chapter-title">

            ${chapter.name}

        </div>


        <div class="chapter-desc">

            ${chapter.description || "JEE Main Chapter"}

        </div>


        <div class="chapter-progress">

            <div class="progress-info">

                <span>

                    ${completedCount}/${totalLectures} Lectures

                </span>

                <span class="progress-percent">

                    ${progress}%

                </span>

            </div>


            <div class="progress-bar">

                <div class="progress-fill"

                style="width:${progress}%">

                </div>

            </div>

        </div>


        <div class="chapter-bottom">

            <span class="lecture-count">

                ${totalLectures} Lectures

            </span>


            <button

            class="open-btn"

            onclick="openChapter(${chapter.id})">

            Open

            </button>

        </div>

    </div>

    `;

}



// ===========================
// Open Chapter
// ===========================

function openChapter(id){

    window.location.href =
    `lecture.html?id=${id}`;

}
// ===========================
// Search Chapters
// ===========================

function initializeSearch(){

    const searchInput =
    document.getElementById("searchInput");

    if(!searchInput) return;

    searchInput.addEventListener("input", function(){

        const keyword =
        this.value.toLowerCase().trim();

        const cards =
        document.querySelectorAll(".chapter-card");

        cards.forEach(card=>{

            const title =
            card.querySelector(".chapter-title")
            .textContent
            .toLowerCase();

            if(title.includes(keyword)){

                card.style.display="block";

            }else{

                card.style.display="none";

            }

        });

    });

}



// ===========================
// Card Animation
// ===========================

function animateCards(){

    const cards =
    document.querySelectorAll(".chapter-card");

    cards.forEach((card,index)=>{

        card.style.opacity="0";

        card.style.transform="translateY(25px)";

        setTimeout(()=>{

            card.style.transition=".35s";

            card.style.opacity="1";

            card.style.transform="translateY(0)";

        },index*80);

    });

}



// ===========================
// Refresh Progress
// ===========================

function refreshPage(){

    loadChapters();

    animateCards();

}



// ===========================
// Auto Refresh
// ===========================

window.addEventListener("focus",()=>{

    refreshPage();

});



// ===========================
// Initialize
// ===========================

document.addEventListener("DOMContentLoaded",()=>{

    initializeSearch();

    animateCards();

});