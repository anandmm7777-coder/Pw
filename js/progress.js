// ==========================================
// JEE Rank Tracker Pro
// progress.js
// P1 - Core Analytics
// ==========================================


// ---------- Elements ----------

const overallPercent =
document.getElementById("overallPercent");

const overallFill =
document.getElementById("overallFill");

const lectureCount =
document.getElementById("lectureCount");

const xpCount =
document.getElementById("xpCount");

const levelCount =
document.getElementById("levelCount");

const streakCount =
document.getElementById("streakCount");

const gradeBox =
document.getElementById("grade");

const readinessPercent =
document.getElementById("readinessPercent");




// ---------- Get Tracker Data ----------

function getTrackerData(){

    return loadData();

}




// ---------- Overall Progress ----------

function updateOverallProgress(){


    const data = getTrackerData();


    let progress = 0;


    if(data.totalLectures > 0){


        progress = Math.round(

            (data.lecturesCompleted /

            data.totalLectures) * 100

        );


    }



    if(overallPercent){

        overallPercent.textContent =
        progress + "%";

    }



    if(overallFill){

        overallFill.style.width =
        progress + "%";

    }


}



// ---------- Lecture Count ----------

function updateLectureCount(){


    const data = getTrackerData();



    if(lectureCount){

        lectureCount.textContent =

        data.lecturesCompleted +

        " / " +

        data.totalLectures;

    }


}



// ---------- JEE Readiness ----------

function updateReadiness(){


    const progress = calculateProgress();



    if(readinessPercent){

        readinessPercent.textContent =

        progress + "%";

    }


}
// ==========================================
// XP + Level + Streak + Grade
// progress.js
// P2
// ==========================================


// ---------- XP Update ----------

function updateXP(){


    const data = getTrackerData();


    if(xpCount){

        xpCount.textContent =

        data.xp + " XP";

    }


}



// ---------- Level Update ----------

function updateLevel(){


    const data = getTrackerData();


    if(levelCount){

        levelCount.textContent =

        "Level " + data.level;

    }


}



// ---------- Real Study Streak ----------

function updateStreak(){


    const data = getTrackerData();


    let streak = data.studyStreak || 0;



    if(streakCount){

        streakCount.textContent =

        streak + " Days";

    }


}



// ---------- Performance Grade ----------

function updateGrade(){


    const progress =

    calculateProgress();



    let grade = "F";



    if(progress >= 95){

        grade = "A+";

    }

    else if(progress >= 85){

        grade = "A";

    }

    else if(progress >= 70){

        grade = "B";

    }

    else if(progress >= 50){

        grade = "C";

    }

    else if(progress >= 30){

        grade = "D";

    }



    if(gradeBox){

        gradeBox.textContent = grade;

    }


}



// ---------- Achievement Check ----------

function checkAchievements(){


    const data = getTrackerData();


    let badges = [];



    if(data.xp >= 100){

        badges.push("Starter");

    }


    if(data.xp >= 500){

        badges.push("Consistent");

    }


    if(data.xp >= 1000){

        badges.push("Advanced");

    }


    if(data.xp >= 2500){

        badges.push("Expert");

    }


    if(data.xp >= 5000){

        badges.push("JEE Warrior");

    }



    localStorage.setItem(

        "badges",

        JSON.stringify(badges)

    );


}
// ==========================================
// Charts System
// progress.js
// P3
// ==========================================


// ---------- Subject Progress Chart ----------

function loadSubjectChart(){


    const chapterProgress =

    JSON.parse(

        localStorage.getItem("chapterProgress")

    ) || {};



    const chapters =

    JSON.parse(

        localStorage.getItem("chapters")

    ) || [];



    let physics = 0;

    let chemistry = 0;

    let maths = 0;



    let physicsCount = 0;

    let chemistryCount = 0;

    let mathsCount = 0;



    chapters.forEach(chapter=>{


        const progress =

        chapterProgress[chapter.id] || 0;



        if(chapter.subject === "Physics"){


            physics += progress;

            physicsCount++;


        }



        if(chapter.subject === "Chemistry"){


            chemistry += progress;

            chemistryCount++;


        }



        if(chapter.subject === "Mathematics"){


            maths += progress;

            mathsCount++;


        }


    });



    physics = physicsCount

    ? Math.round(physics / physicsCount)

    : 0;



    chemistry = chemistryCount

    ? Math.round(chemistry / chemistryCount)

    : 0;



    maths = mathsCount

    ? Math.round(maths / mathsCount)

    : 0;




    const canvas =

    document.getElementById("subjectChart");



    if(!canvas) return;



    new Chart(

        canvas,

        {

            type:"bar",


            data:{


                labels:[

                    "Physics",

                    "Chemistry",

                    "Mathematics"

                ],


                datasets:[{


                    label:"Progress %",


                    data:[

                        physics,

                        chemistry,

                        maths

                    ],


                    borderWidth:2


                }]


            },


            options:{


                responsive:true,


                plugins:{


                    legend:{

                        display:false

                    }


                },


                scales:{


                    y:{


                        beginAtZero:true,

                        max:100


                    }


                }


            }


        }

    );


}






// ---------- Weekly Progress Chart ----------

function loadWeeklyChart(){



    const history =

    JSON.parse(

        localStorage.getItem("studyHistory")

    ) || {};



    let values = [];

    let labels = [];



    for(let i=6;i>=0;i--){


        let date = new Date();


        date.setDate(

            date.getDate()-i

        );



        let key =

        date.toISOString()

        .split("T")[0];



        labels.push(

            date.toLocaleDateString(

                "en-IN",

                {

                    weekday:"short"

                }

            )

        );



        values.push(

            history[key]?.lectures || 0

        );


    }




    const canvas =

    document.getElementById("weeklyChart");



    if(!canvas) return;




    new Chart(

        canvas,

        {


            type:"line",



            data:{


                labels:labels,


                datasets:[{


                    label:"Lectures",


                    data:values,


                    tension:0.4,


                    fill:false,


                    borderWidth:3


                }]


            },



            options:{


                responsive:true,


                plugins:{


                    legend:{


                        display:false


                    }


                },


                scales:{


                    y:{


                        beginAtZero:true


                    }


                }


            }


        }

    );

}
// ==========================================
// Final Initialization
// progress.js
// P4
// ==========================================


// ---------- Refresh Dashboard ----------

function refreshProgressDashboard(){


    updateOverallProgress();


    updateLectureCount();


    updateXP();


    updateLevel();


    updateStreak();


    updateReadiness();


    updateGrade();


    checkAchievements();


}



// ---------- Page Load ----------

window.addEventListener(

"load",

()=>{


    refreshProgressDashboard();



    // Charts Load

    loadSubjectChart();


    loadWeeklyChart();



});
