let DirtyDB = {
    "users": {
        "admin@gmail.com":{
            "name": "Admin",
            "password": 127,
            "teams": ["builders leauge united"],
            "invites": ["reliable excavation and demolition"],
            "shifts": [1],
        },
        "janedoe@gmail.com":{
            "name": "Jane Doe",
            "password": 126,
            "teams": ["builders leauge united", "reliable excavation and demolition"],
            "invites": [],
            "shifts": [],
        },
    },

    "teams": {
        "builders leauge united": {
            "admins": ["thepyro@gmail.com"],
            "shifts": [1, 12],
        },
        "reliable excavation and demolition": {
            "admins": ["janedoe@gmail.com"],
            "shifts": [],
        },
    },

    "shifts": {
        1: {
            "name": "Renamed Shift",
            "startTime": "12:00",
            "endTime": "14:00",
            "date": "12/02/24",
            "taken": true,
        },
        12: {
            "name": "Untaken Shift",
            "startTime": "12:00",
            "endTime": "14:00",
            "date": "12/04/24",
            "taken": false,
        }
    },
}