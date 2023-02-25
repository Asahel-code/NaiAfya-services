require('dotenv').config();
const ussdMenu = require('ussd-builder');
const { makeCall } = require('../utils/makeCall');

const menu = new ussdMenu();

menu.startState({
    run: () => {
        menu.con('Welcome to NaiAfya. Choose your service:' +
            '\n 1. Call a hospital' +
            '\n 2. Call an ambulance' +
            '\n 3. Exit');
    },
    next: {
        '1': 'Call a hospital',
        '2': 'Call an ambulance',
        '3': 'Exit'
    }
});

menu.state('Call a hospital', {
    run: () => {
        menu.con('Choose a hospital of your choice:' +
            '\n 1. Mama lucy' +
            '\n 2. Kenyatta National Hospital' +
            '\n 3. Mathare Hospital' +
            '\n 4. Mbagathi Hospital');
    },
    next: {
        '1': 'Mama lucy',
        '2': 'Kenyatta National Hospital',
        '3': 'Mathare Hospital',
        '4': 'Bangathi Hospital'
    }
});

menu.state('Exit', {
    run: () => {
        menu.end('Thank you for using our services')
    }
});

menu.state('Mama lucy', {
    run: () => {
        const client_number = menu.args.phoneNumber;
        const hospital_phonenumber = process.env.HOSPITAL_NUMBER; 
        callMamaLucy = new makeCall({ hospital_phonenumber, client_number });

        callMamaLucy.connectToService();
        menu.end('Thank you for using our services, please be patient as we connect you to Mama lucy')
    }
});

menu.state('Kenyatta National Hospital', {
    run: () => {
        const client_number = menu.args.phoneNumber;
        const hospital_phonenumber = process.env.HOSPITAL_NUMBER;
        kenyatta = new makeCall({ hospital_phonenumber, client_number });

        kenyatta.connectToService();
        menu.end('Thank you for using our services, please be patient as we connect you to Kenyatta National Hospital')
    }
});

menu.state('Mathare Hospital', {
    run: () => {
        const client_number = menu.args.phoneNumber;
        const hospital_phonenumber = process.env.HOSPITAL_NUMBER;
        mathare = new makeCall({ hospital_phonenumber, client_number });

        mathare.connectToService();
        menu.end('Thank you for using our services, please be patient as we connect you to Mathare Hospital')
    }
});

menu.state('Bangathi Hospital', {
    run: () => {
        const client_number = menu.args.phoneNumber;
        const hospital_phonenumber = process.env.HOSPITAL_NUMBER;
        bangathi = new makeCall({ hospital_phonenumber, client_number });

        bangathi.connectToService();
        menu.end('Thank you for using our services, please be patient as we connect you to Bangathi Hospital')
    }
});

menu.state('Call an ambulance', {
    run: () => {
        const client_number = menu.args.phoneNumber;
        const hospital_phonenumber = process.env.HOSPITAL_NUMBER;
        ambulance = new makeCall({ hospital_phonenumber, client_number });

        ambulance.connectToService();
        menu.end('Thank you for using our services, please be patient as we connect you to an ambulance service')
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