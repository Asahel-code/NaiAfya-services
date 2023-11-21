require('dotenv').config();
const ussdMenu = require('ussd-builder');
const { makeCall } = require('../utils/makeCall');
const Ambulance = require('../models/Ambulance');
const Hospital = require('../models/Hospital');

const menu = new ussdMenu();

let hospitals;
let ambulances;

menu.startState({
    run: async () => {
        menu.con('Welcome to Tibaconnect. Choose your service:' +
            '\n 1. Call a hospital' +
            '\n 2. Call an ambulance' +
            '\n 3. Exit');
    },
    next: {
        '1': 'hospital',
        '2': 'ambulance',
        '3': 'Exit'
    }
});

menu.state('hospital', {
    run: async () => {
        try {
            hospitals = await Hospital.find();

            if (hospitals.length > 0) {
                menu.con('Choose a hospital of your choice:\n' +
                    hospitals.map((hospital, index) => (
                        index + 1 + ": " + hospital.name + "\n"
                    ))
                );
            } else {
                menu.con('No hospitals found.');
            }
        } catch (error) {
            console.error('Error fetching hospitals from MongoDB:', error?.message);
            menu.end('An error occurred. Please try again later.');
        }
    },
    next: {
        '*\\d+': "hospital.index"
    }

});

menu.state('hospital.index', {
    run: async () => {
        let hospitalIndex = menu.val;

        if (hospitalIndex >= 1 && hospitalIndex <= hospitals.length) {
            let selectedHospital = hospitals[hospitalIndex - 1];

            console.log('User selected:', selectedHospital.name);
            const client_number = menu.args.phoneNumber;
            const hospital_phonenumber = selectedHospital.contactNumber;
            const callHospital = new makeCall({ hospital_phonenumber, client_number });

            callHospital.connectToService();
            menu.end(`Thank you for using our services, please be patient as we connect you to ${selectedHospital.name}`)

        } else {
            menu.con('Invalid input. Please choose a hospital from the list.');
        }
    }

});

menu.state('ambulance', {
    run: async () => {
        try {
            ambulances = await Ambulance.find();

            if (ambulances.length > 0) {
                menu.con('Choose an ambulance of your choice:\n' +
                    ambulances.map((ambulance, index) => (
                        index + 1 + ": " + ambulance.name + "\n"
                    ))
                );
            } else {
                menu.con('No ambulances found.');
            }
        } catch (error) {
            console.error('Error fetching ambulances from MongoDB:', error?.message);
            menu.end('An error occurred. Please try again later.');
        }
    },
    next: {
        '*\\d+': "ambulance.index"
    }

});

menu.state('ambulance.index', {
    run: async () => {
        let ambulanceIndex = menu.val;

        if (ambulanceIndex >= 1 && ambulanceIndex <= ambulances.length) {
            let selectedAmbulance = ambulances[ambulanceIndex - 1];

            console.log('User selected:', selectedAmbulance.name);
            const client_number = menu.args.phoneNumber;
            const ambulance_phonenumber = selectedAmbulance.contactNumber;
            const callAmbulance = new makeCall({ ambulance_phonenumber, client_number });

            callAmbulance.connectToService();
            menu.end(`Thank you for using our services, please be patient as we connect you to ${selectedAmbulance.name}`)

        } else {
            menu.con('Invalid input. Please choose an ambulance from the list.');
        }
    }

});


menu.state('Exit', {
    run: () => {
        menu.end('Thank you for using our services')
    }
});


const connectToUssdService = (req, res) => {
    menu.run(req.body, ussdResult => [
        res.send(ussdResult)
    ])
}

module.exports = {
    connectToUssdService,
}