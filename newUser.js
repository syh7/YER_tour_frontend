let requestTarget = "http://localhost:8082/";
let participant = {};

function newParticipant() {
    if(checkPassword()){  
        let req = new XMLHttpRequest();
        req.open("POST", requestTarget + "participants", true);
        //req.responseType = "json";
        req.onload = function() {
            console.log(JSON.parse(this.responseText).id);
            openUser(JSON.parse(this.responseText).id);
        }
        req.setRequestHeader("Content-Type", "application/json");
        req.send(JSON.stringify(getUserInput()));
    } else {
        alert("Passwords do not matchTEST");
    }
}

function getUserInput() {
    participant.email = document.getElementById("email").value;
    participant.password = document.getElementById("password").value;
    participant.firstName = document.getElementById("firstName").value;
    participant.lastName = document.getElementById("lastName").value;
    participant.playerLevel = document.getElementById("playerLevel").value;
    participant.dateOfBirth = document.getElementById("dateOfBirth").value;
    participant.leagueNumber = document.getElementById("leagueNumber").value;
    let gender = $("input[type='radio'][name='gender']:checked").val();
    participant.isMale = gender == "male";
    console.log(JSON.stringify(participant));
    return participant;
}

function checkPassword(){
    if(document.getElementById("password").value == document.getElementById("passwordConfirm").value){
        return true;
    } else {
        return false;
    }
}

function openUser(userId){
    console.log("In openUser(): " + userId);
    alert("In openUser()");
    window.location.href = 'participant.html?id=' + userId;
}