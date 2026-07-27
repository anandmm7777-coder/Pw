// ==========================================
// JEE Rank Tracker Pro
// app.js (Fixed Version)
// ==========================================

// ---------- Default Data ----------

const DEFAULT_DATA = {
    lecturesCompleted: 0,
    totalLectures: 0,
    questionsSolved: 0,
    totalQuestions: 0,
    revisionCompleted: 0,
    totalRevision: 0,
    xp: 0,
    level: 1,
    studyStreak: 0,
    lastStudyDate: "",
    weeklyHistory: {},
    chapterProgress: {}
};

// ---------- Load Data ----------

function loadData(){

    try{

        let data = JSON.parse(
            localStorage.getItem("jeeTrackerData")
        );

        if(!data){

            localStorage.setItem(
                "jeeTrackerData",
                JSON.stringify(DEFAULT_DATA)
            );

            return {...DEFAULT_DATA};
        }

        return {
            ...DEFAULT_DATA,
            ...data
        };

    }catch(e){

        localStorage.setItem(
            "jeeTrackerData",
            JSON.stringify(DEFAULT_DATA)
        );

        return {...DEFAULT_DATA};

    }

}

// ---------- Save Data ----------

function saveData(data){

    localStorage.setItem(
        "jeeTrackerData",
        JSON.stringify(data)
    );

}

// ---------- XP ----------

function calculateXP(){

    let completed = JSON.parse(
        localStorage.getItem("completedLectures")
    ) || [];

    return completed.length * 10;

}

// ---------- Level ----------

function calculateLevel(xp){

    return Math.floor(xp / 500) + 1;

}

// ---------- Progress ----------

function calculateProgress(){

    let data = loadData();

    if(data.totalLectures <= 0){
        return 0;
    }

    return Math.round(
        (data.lecturesCompleted / data.totalLectures) * 100
    );

}

// ---------- Weekly Study ----------

function saveStudyHistory(){

    let today =
    new Date().toISOString().split("T")[0];

    let data = loadData();

    if(!data.weeklyHistory){
        data.weeklyHistory = {};
    }

    if(!data.weeklyHistory[today]){
        data.weeklyHistory[today] = 0;
    }

    data.weeklyHistory[today]++;

    saveData(data);

}

// ---------- Study Streak ----------

function updateStudyStreak(){

    let data = loadData();

    let today =
    new Date().toISOString().split("T")[0];

    if(data.lastStudyDate === today){
        return;
    }

    if(data.lastStudyDate){

        let yesterday = new Date();

        yesterday.setDate(
            yesterday.getDate()-1
        );

        let y =
        yesterday.toISOString().split("T")[0];

        if(data.lastStudyDate === y){

            data.studyStreak++;

        }else{

            data.studyStreak = 1;

        }

    }else{

        data.studyStreak = 1;

    }

    data.lastStudyDate = today;

    saveData(data);

}

// ---------- Dashboard Sync ----------

function syncData(){

    let data = loadData();

    let lectures = JSON.parse(
        localStorage.getItem("lectures")
    ) || [];

    let completed = JSON.parse(
        localStorage.getItem("completedLectures")
    ) || [];

    // Remove Invalid IDs
    completed = completed.filter(id =>
        lectures.some(l => l.id === id)
    );

    localStorage.setItem(
        "completedLectures",
        JSON.stringify(completed)
    );

    data.totalLectures = lectures.length;

    data.lecturesCompleted = completed.length;

    if(data.lecturesCompleted > data.totalLectures){
        data.lecturesCompleted = data.totalLectures;
    }

    data.xp = calculateXP();

    data.level = calculateLevel(data.xp);

    saveData(data);

}

// ---------- Auto Sync ----------

window.addEventListener("load", syncData);
// ===========================
// Global Dark Theme
// ===========================

(function(){

    const darkMode =
    localStorage.getItem("darkMode");

    if(darkMode === "true"){

        document.documentElement.classList.add("dark");

        document.body.classList.add("dark");

    }

})();