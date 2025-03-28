const mainHTML = document.getElementById('main')

// Templates
const dashboardTemplate = document.getElementById('DashboardTemplate').innerHTML
const loginTemplate = document.getElementById('LoginTemplate').innerHTML
const teamTemplate = document.getElementById('TeamTemplate').innerHTML
const createTeamTemplate = document.getElementById('CreateTeamTemplate').innerHTML
const inviteMemberTemplate = document.getElementById('InviteMemberTemplate').innerHTML
const createShiftTemplate = document.getElementById('CreateShiftTemplate').innerHTML

// Variables

// currentUser should be the EMAIL of the account
// let currentUser = "admin@gmail.com"
let currentUser = null


let currentTeam = null

renderDashboard()

// Screen rendering
function renderDashboard(){
    currentTeam = null
    if(currentUser){
        // Init Dashboard
        mainHTML.innerHTML = dashboardTemplate
        profileMenuInit()
        initButtons();
        load()
        reloadCSS()

        // Render Shifts as a list
        const shiftList = document.getElementById('shiftList')
        shiftList.innerHTML = "<li>You have no upcoming shifts!</li>"
        if(DirtyDB.users[currentUser].shifts.length > 0){
            shiftList.innerHTML = ""
            for(shifti in DirtyDB.users[currentUser].shifts){
                const shiftID = DirtyDB.users[currentUser].shifts[shifti]
                const {name, startTime, endTime, date} = DirtyDB.shifts[shiftID]
                shiftList.innerHTML += `<li>${name}. ${date}, ${startTime} to ${endTime}</li>`
            }
        }

        // Render team list
        const teamList = document.getElementById('teamList')
        teamList.innerHTML = ""
        for(teami in DirtyDB.users[currentUser].teams){
            const team = DirtyDB.users[currentUser].teams[teami]
            teamList.innerHTML += `<li><a href="#" onclick=" renderTeam('${team}');">${team}</a></li>`
        }

        // Render invite list
        const inviteList = document.getElementById('inviteList')
        inviteList.innerHTML = "<li>You have no invites!</li>"
        if(DirtyDB.users[currentUser].invites.length > 0){
            inviteList.innerHTML = ""
            for(invitei in DirtyDB.users[currentUser].invites){
                const invite = DirtyDB.users[currentUser].invites[invitei]
                inviteList.innerHTML += `<li><a href="#" onclick=" acceptInvite('${invite}'); ">You were invited to '${invite}'</a></li>`
            }
        }

        return
    }

    renderLogin()
}

function renderLogin(){
    mainHTML.innerHTML = loginTemplate
    submitMode = "SignUp"
    reloadCSS()
}

function reloadCSS(){
    let links = document.getElementsByTagName('link');
      for (let i = 0; i < links.length; i++) {
        if (links[i].getAttribute('rel') == 'stylesheet') {
        let href = links[i].getAttribute('href').split('?')[0];
              let newHref = href + '?version=' 
                           + new Date().getMilliseconds();
              links[i].setAttribute('href', newHref);
          }
      }
}

function renderTeam(team){
    currentTeam = team
    if(team in DirtyDB.teams){
        // Init Team Page
        mainHTML.innerHTML = teamTemplate
        reloadCSS()

        const adminField = document.getElementById('adminField')

        profileMenuInit()

        if(!(DirtyDB.teams[team].admins.includes(currentUser))){
            adminField.innerHTML = ""
        }

        const teamHeader = document.getElementById('teamName')
        teamHeader.innerHTML = `${team}`

        const shiftList = document.getElementById('teamShiftList')
        shiftList.innerHTML = "<li>This team has no upcoming shifts!</li>"
        if(DirtyDB.teams[currentTeam].shifts.length > 0){
            shiftList.innerHTML = ""
            for(shifti in DirtyDB.teams[currentTeam].shifts){
                const shiftID = DirtyDB.teams[currentTeam].shifts[shifti]
                const {name, startTime, endTime, date, taken} = DirtyDB.shifts[shiftID]
                if(taken){
                    shiftList.innerHTML += `<li>${name}. ${date}, ${startTime} to ${endTime}</li>`
                }
                else{
                    shiftList.innerHTML += `<li><a href="#" onclick=" acceptShift('${shiftID}'); ">${name}. ${date}, ${startTime} to ${endTime}</a></li>`
                }
                
            }
        }

        return
    }
    alert(`Team '${team}' not found`);
     
}

function renderCreateTeam(){
    mainHTML.innerHTML = createTeamTemplate
    reloadCSS()
}

function renderInviteMember(){
    mainHTML.innerHTML = inviteMemberTemplate
    reloadCSS()
}

function acceptInvite(teamName){
    let TheUser = DirtyDB.users[currentUser]
    TheUser.invites = TheUser.invites.filter(function(item) {
        return item !== teamName
    })
    TheUser.teams.push(teamName)

    renderDashboard()
}

function logOut(){
    currentUser = null
    renderLogin()
}

function renderCreateShift(){
    mainHTML.innerHTML = createShiftTemplate
    reloadCSS()
}