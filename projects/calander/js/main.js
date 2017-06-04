'use strict';
// Your challenge is to build some basic calendar functionality.
//  Create your data structure: 3-4 meetings containing: title, startDate (in timestamp), endDate, array of participant names.
//  Organize the meetings so that they are sorted by startDate
//  Write the following functions:
// o addMeeting(title, start, end, participants) create a new meeting and put 
// it in the right place in the array (may need to push the rest of the array)
// o findNextMeeting() – returns the next meeting on my calendar (the first meeting that starts after now )
// o getMeetingsCountFor(participantName) – returns how many meetings this participantName is invited to
//  Create an HTML interface that shows the events list and activate all the functions
console.log('aa');


var gPersons = {};
var gMeetings = [];
var gState = {
    isFormOpen: false
}

function init () {
    var meetings = [
    {
        title: 'study',
        startTime: new Date('June 19, 2017 15:24:00'),
        endTime: new Date('December 17, 2017 16:24:00'),
        participants: ['Guy', 'Asaf', 'Gal']
    },
    {
        title: 'Amazon',
        startTime: new Date('may 25, 2017 08:30:00'),
        endTime: new Date('May 25, 2017 12:30:00'),
        participants: ['Guy', 'Ori', 'Nir']
    },
    {
        title: 'Work',
        startTime: new Date('June 25, 2017 18:00:00'),
        endTime: new Date('june 25, 2017 19:00:00'),
        participants: ['Guy', 'Shiko']
    }
]

meetings.forEach(function(meeting){
    addMeeting(meeting.title, meeting.startTime, meeting.endTime, meeting.participants);
});

renderCalender();

}

function addMeeting(i_title, i_startTime, i_endTime, i_participants) {
    var lowerCaseParticipants = i_participants.map(function (participant) {
        return participant.toLowerCase();
    });
    var meeting = {
        title: i_title,
        startTime: i_startTime,
        endTime: i_endTime,
        participants: lowerCaseParticipants
    };
    gMeetings.push(meeting);

    lowerCaseParticipants.forEach(function (person) {

        if (!gPersons[person]) {
            gPersons[person] = [meeting];
        }
        else {
            gPersons[person].push(meeting);
        }
    });
}

function openMeetingForm(elAddMeetingDiv) {
    event.stopPropagation();
    if (!gState.isFormOpen) {
        gState.isFormOpen = true;
        var addMeetingFormStr = ` 
        
             <div class="form-row"> Title:             <input type="text" id="title"> </div>
             <div class="form-row"> Start Time:        <input type="datetime-local" id="start-time"> </div>
             <div class="form-row"> End Time:          <input type="datetime-local" id="end-time"> </div>
             <div class="form-row"> Participants:      <input type="text" id="participants"> </div>
             
             <div class="form-row"><button onclick="renderAddMeeting()">Save</button></div>`;

        elAddMeetingDiv.innerHTML += addMeetingFormStr;
    } 

}

function closeMeetingForm() {
    if (gState.isFormOpen) {
        var elAddMeetingDiv = document.querySelector('.add-meeting');
        elAddMeetingDiv.innerText = 'Add Meeting';
        gState.isFormOpen = false;
    }

}

function saveNewMeeting() {
    gState.isFormOpen = false;
    
    var elNewTitle = document.querySelector('#title');
    
    var elNewStartTime = document.querySelector('#start-time');
    var startTime = new Date(elNewStartTime.value);

    var elNewEndTime = document.querySelector('#end-time');
    var endTime = new Date(elNewEndTime.value);

    var elNewparticipantList = document.querySelector('#participants');
    var participants = elNewparticipantList.value.split(',').map(function (item) {  
        return item.trim();
    });
    addMeeting(elNewTitle.value, startTime, endTime, participants)
    var elAddMeetingDiv = document.querySelector('.add-meeting');
    elAddMeetingDiv.innerHTML = 'Add Meeting';
    toggleNav();
    // renderAddMeeting(gMeetings.slice(-1));
}


function sortMeetingsByStartDate(i_meetings) {
    i_meetings.sort(function (meetingA, meetingB) {
        return meetingA.startTime - meetingB.startTime
    });
}


//only on sorted by start time array of meetings
function findNextMeeting(i_meetings) {
    var currTime = Date.now();
    var firstMeeting;
    i_meetings.some(function (meeting) {
        firstMeeting = meeting;
        return meeting.startTime > currTime

    });
    return firstMeeting
}


function getMeetingsCountFor(i_participant) {

    return gPersons[i_participant].length

}


function toggleNav() {
    var elNavBar = document.querySelector('nav');
    elNavBar.classList.toggle('open');
    closeMeetingForm();
    event.stopPropagation();
}

function hideNav() {
    var elNavBar = document.querySelector('nav');
    elNavBar.classList.remove('open');
    closeMeetingForm();
    event.stopPropagation();

}


// ===========================render==========================

function renderCalender() {
    var elCalenderContainer = document.querySelector('.calender-container');
    var strHtml = '';
    gMeetings.forEach(function (meeting, idx) {
        var startTime = moment(meeting.startTime).format('MMMM Do YYYY, hh:mm a')
        var endTime = moment(meeting.endTime).format('MMMM Do YYYY, hh:mm a')
        strHtml += `<div class="meeting${idx}"> Title: ${meeting.title} <br> Start time: ${startTime},<br> End Time: ${endTime} </div> `;
    });
    elCalenderContainer.innerHTML = strHtml;
}

function renderGetMeetingsCountFor() {
    var participant = prompt('Show number of meetings for: ');
    var lowerCaseParticipant = participant.toLowerCase();
    if (gPersons[lowerCaseParticipant])   alert(` ${participant} has ${getMeetingsCountFor(lowerCaseParticipant)} meetings`);
    else alert(`Didn't find meetings for: ${participant} `)
}

function renderFindNextMeeting() {
    var nextMeeting = findNextMeeting(gMeetings);
    var startTime = moment(nextMeeting.startTime).format('MMMM Do YYYY, hh:mm a')
    alert(`Your next Meeting is: ${nextMeeting.title}, starting at: ${startTime} `);
}

function renderSortMeeting() {
    sortMeetingsByStartDate(gMeetings);
    renderCalender();
}

function renderAddMeeting(meeting) {
    saveNewMeeting();
    renderCalender();
}

