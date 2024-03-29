let tournament = {};

load();

/* Load tournament info from backend, also save it locally
*/
function load() {
    let id = new URL(location.href).searchParams.get('id')
    console.log(id);
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "tournaments/" + id, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function () {
        tournament = JSON.parse(this.response);
        localStorage.setItem("tournament", this.response);
        console.log(localStorage.getItem("tournament"));
        setInfoDiv();
        setPhaseDiv();
    };
    req.send();
}

function setInfoDiv() {
    document.getElementById("tournamentName").innerHTML = tournament.name;
    setAdminName();

    document.getElementById("enrolDateDiv").innerHTML = "<b>Enrol date: </b>" + tournament.enrolDate + "<b>.</b>";
    document.getElementById("playDatesDiv").innerHTML = "<b>Tournament lasts from </b>" + tournament.startDate + "<b> to </b>" + tournament.endDate + "<b>.</b>";

    document.getElementById("locationDiv").innerHTML = "<b>Location: </b>" + tournament.location + "<b>.</b>";
    document.getElementById("levelsDiv").innerHTML = "<b>Levels: </b>" + tournament.levels + "<b>.</b>";
    document.getElementById("disciplinesDiv").innerHTML = "<b>Maximum enrolments: </b>" + tournament.maxDisciplines + "<b>.</b>";
    document.getElementById("refereeDiv").innerHTML = "<b>Referee: </b>" + tournament.referee + "<b>.</b>";

    document.getElementById("descriptionDiv").innerHTML = tournament.description;
}

function setAdminName() {
    let req = new XMLHttpRequest();
    req.open("GET", serverIP + "admins/" + tournament.adminId, true);
    req.setRequestHeader("Content-type", "application/json");
    req.onload = function () {
        document.getElementById("adminDiv").innerHTML = "Tournament organised by " + JSON.parse(this.response).name + ".";
    };
    req.send();
}

/* Sets tournament phase dependant on tournament dates
*/
function setPhaseDiv() {
    let phaseDiv = document.getElementById("phaseDiv");
    let currentDate = new Date();
    if (new Date(tournament.enrolDate) > currentDate) { //enroldate not yet then enrolment phase
        phaseDiv.innerHTML = "Enrolments are open.";
        phaseDiv.classList.add("enrolment");

        let button = document.createElement("button");
        button.onclick = function () {
            enrol();
        }
        button.classList.add("btn");
        button.innerHTML = "Enrol in tournament.";
        document.getElementById("infoDiv").after(button);

    } else if (new Date(tournament.startDate) > currentDate) { //enroldate passed, not started yet
        phaseDiv.innerHTML = "Enrolments are closed.";
    } else if (new Date(tournament.endDate) > currentDate) { //started, not finished yet
        phaseDiv.innerHTML = "Tournament has started.";
        phaseDiv.classList.add("started");
    } else { //finished
        phaseDiv.innerHTML = "Tournament has finished.";
    }
}

/* Redirect to enrolment page
*/
function enrol() {
    console.log("In enrol(): " + tournament.id);
    window.location.href = "../enrolment/enrolment.html";
}

/* If participant, goes to participant/participant. Otherwise checks if admin, then goes to admin/admin.
    Otherwise, gives error that you're not logged in.
*/
function goHome() {
    let participant = JSON.parse(localStorage.getItem("participant"));
    if (participant !== null) {
        window.location.href = "../participant/participant.html?id=" + participant.id;
    } else {
        let admin = JSON.parse(localStorage.getItem("admin"));
        if (admin !== null) {
            window.location.href = "../admin/admin.html?id=" + admin.id;
        } else {
            alert("Not logged in as participant or admin.");
        }
    }
}

function goBack() {
    window.history.back();
}

function editUser() {
    let participant = JSON.parse(localStorage.getItem("participant"));
    if (participant !== null) {
        window.location.href = "../newparticipant/newparticipant.html?id=" + participant.id;
    } else {
        let admin = JSON.parse(localStorage.getItem("admin"));
        if (admin !== null) {
            window.location.href = "../newadmin/newadmin.html?id=" + admin.id;
        } else {
            alert("Not logged in as participant or admin.");
        }
    }
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        alert("You have logged out.");
        window.location.href = "../index.html";
    }
}