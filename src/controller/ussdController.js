require('dotenv').config();
const ussdMenu = require('ussd-builder');
const { makeCall } = require('../utils/makeCall');
const Ambulance = require('../models/Ambulance');
const AmbulanceSession = require('../models/AmbulanceSession');
const Hospital = require('../models/Hospital');
const HospitalSession = require('../models/HospitalSession');
const Fighter = require('../models/Fighter');
const FighterSession = require('../models/FighterSession');
const Police = require('../models/Police');
const PoliceSession = require('../models/PoliceSession');

const menu = new ussdMenu();

let hospitals;
let ambulances;
let fireFighters;
let policeStations;

menu.startState({
    run: async () => {
        menu.con('Welcome to Tibaconnect. Choose your service:' +
            '\n 1. Call a hospital' +
            '\n 2. Call an ambulance' +
            '\n 3. Call a fire fighter' +
            '\n 4. Call a police station' +
            '\n 5. Exit');
    },
    next: {
        '1': 'hospital',
        '2': 'ambulance',
        '3': 'fire_fighter',
        '4': 'police_station',
        '5': 'Exit'
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

            const client_number = menu.args.phoneNumber;
            const service_phone_number = selectedHospital.contactNumber;
            const callHospital = new makeCall({ service_phone_number, client_number });

            callHospital.connectToService()
                .then(async () => {
                    const newHospitalSession = new HospitalSession({
                        hospital: selectedHospital._id,
                        status: "success"
                    });

                    try {
                        await newHospitalSession.save();

                        menu.end(`Thank you for using our services, please be patient as we connect you to ${selectedHospital.name}`)

                    } catch (error) {
                        console.error('Error adding hospital session:', error?.message);
                        menu.end('An error occurred. Please try again later.');
                    }
                })
                .catch(async (error) => {
                    const newHospitalSession = new HospitalSession({
                        hospital: selectedHospital._id,
                        status: "failed"
                    });

                    try {
                        await newHospitalSession.save();

                        console.error('Error initiating a call:', error?.message);
                        menu.end('An error occurred. Please try again later.');

                    } catch (error) {
                        console.error('Error adding hospital session:', error?.message);
                        menu.end('An error occurred. Please try again later.');
                    }
                })
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

            const client_number = menu.args.phoneNumber;
            const service_phone_number = selectedAmbulance.contactNumber;
            const callAmbulance = new makeCall({ service_phone_number, client_number });

            callAmbulance.connectToService()
                .then(async () => {
                    const newAmbulanceSession = new AmbulanceSession({
                        ambulance: selectedAmbulance._id,
                        status: "success"
                    });

                    try {
                        await newAmbulanceSession.save();

                        menu.end(`Thank you for using our services, please be patient as we connect you to ${selectedAmbulance.name}`)

                    } catch (error) {
                        console.error('Error adding ambulance session:', error?.message);
                        menu.end('An error occurred. Please try again later.');
                    }
                })
                .catch(async (error) => {
                    const newAmbulanceSession = new AmbulanceSession({
                        ambulance: selectedAmbulance._id,
                        status: "failed"
                    });

                    try {
                        await newAmbulanceSession.save();

                        console.error('Error initiating a call:', error?.message);
                        menu.end('An error occurred. Please try again later.');

                    } catch (error) {
                        console.error('Error adding hospital session:', error?.message);
                        menu.end('An error occurred. Please try again later.');
                    }
                })

        } else {
            menu.con('Invalid input. Please choose an ambulance from the list.');
        }
    }

});

menu.state('fire_fighter', {
    run: async () => {
        try {
            fireFighters = await Fighter.find();

            if (fireFighters.length > 0) {
                menu.con('Choose a fire fighter of your choice:\n' +
                    fireFighters.map((fireFighter, index) => (
                        index + 1 + ": " + fireFighter.name + "\n"
                    ))
                );
            } else {
                menu.con('No fire fighter found.');
            }
        } catch (error) {
            console.error('Error fetching fire fighters from MongoDB:', error?.message);
            menu.end('An error occurred. Please try again later.');
        }
    },
    next: {
        '*\\d+': "fire_fighter.index"
    }

});

menu.state('fire_fighter.index', {
    run: async () => {
        let fireFighterIndex = menu.val;

        if (fireFighterIndex >= 1 && fireFighterIndex <= fireFighters.length) {
            let selectedFireFighter = fireFighters[fireFighterIndex - 1];

            const client_number = menu.args.phoneNumber;
            const service_phone_number = selectedFireFighter.contactNumber;
            const callFireFighter = new makeCall({ service_phone_number, client_number });

            callFireFighter.connectToService()
                .then(async () => {
                    const newFighterSession = new FighterSession({
                        fighter: selectedFireFighter._id,
                        status: "success"
                    });

                    try {
                        await newFighterSession.save();

                        menu.end(`Thank you for using our services, please be patient as we connect you to ${selectedFireFighter.name}`)

                    } catch (error) {
                        console.error('Error adding fire fighter session:', error?.message);
                        menu.end('An error occurred. Please try again later.');
                    }
                })
                .catch(async (error) => {
                    const newFighterSession = new FighterSession({
                        fighter: selectedFireFighter._id,
                        status: "failed"
                    });

                    try {
                        await newFighterSession.save();

                        console.error('Error initiating a call:', error?.message);
                        menu.end('An error occurred. Please try again later.');

                    } catch (error) {
                        console.error('Error adding fire fighter session:', error?.message);
                        menu.end('An error occurred. Please try again later.');
                    }
                })

        } else {
            menu.con('Invalid input. Please choose a fire fighter from the list.');
        }
    }
});

menu.state('police_station', {
    run: async () => {
        try {
            policeStations = await Police.find();

            if (policeStations.length > 0) {
                menu.con('Choose a police station of your choice:\n' +
                    policeStations.map((policeStation, index) => (
                        index + 1 + ": " + policeStation.name + "\n"
                    ))
                );
            } else {
                menu.con('No police station found.');
            }
        } catch (error) {
            console.error('Error fetching police stations from MongoDB:', error?.message);
            menu.end('An error occurred. Please try again later.');
        }
    },
    next: {
        '*\\d+': "police_station.index"
    }

});

menu.state('police_station.index', {
    run: async () => {
        let policeStationIndex = menu.val;

        if (policeStationIndex >= 1 && policeStationIndex <= policeStations.length) {
            let selectedPoliceStation = policeStations[policeStationIndex - 1];

            const client_number = menu.args.phoneNumber;
            const service_phone_number = selectedPoliceStation.contactNumber;
            const callPoliceStation = new makeCall({ service_phone_number, client_number });

            callPoliceStation.connectToService()
                .then(async () => {
                    const newPoliceStationSession = new PoliceSession({
                        police: selectedPoliceStation._id,
                        status: "success"
                    });

                    try {
                        await newPoliceStationSession.save();

                        menu.end(`Thank you for using our services, please be patient as we connect you to ${selectedPoliceStation.name}`)

                    } catch (error) {
                        console.error('Error adding police station session:', error?.message);
                        menu.end('An error occurred. Please try again later.');
                    }
                })
                .catch(async (error) => {
                    const newPoliceStationSession = new PoliceSession({
                        police: selectedPoliceStation._id,
                        status: "failed"
                    });
            
                    try {
                        await newPoliceStationSession.save();

                        console.error('Error initiating a call:', error?.message);
                        menu.end('An error occurred. Please try again later.');

                    } catch (error) {
                        console.error('Error adding police station session:', error?.message);
                        menu.end('An error occurred. Please try again later.');
                    }
                })

        } else {
            menu.con('Invalid input. Please choose a police station from the list.');
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