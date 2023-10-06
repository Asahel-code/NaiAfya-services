'use strict';
require('dotenv').config();

const credentials = {
    apiKey: process.env.API_KEY,
    username: process.env.API_USERNAME
}

const AfricasTalking = require('africastalking')(credentials);

const voice = AfricasTalking.VOICE;

class makeCall {
    constructor({ hospital_phonenumber, client_number }) {
        if (!hospital_phonenumber) {
            throw new Error(
                'Missing required parameters: hospital_phonenumber'
            );
        }

        this.hospital_phonenumber = hospital_phonenumber;
        this.client_number = client_number;
    }



    async connectToService() {
        let callAction = `<Response><Say>Please wait as we connect you to a patient wishing to reachout</Say></Response>`;

        const options = { callFrom: process.env.AT_VIRTUALNUMBER, callTo: [this.hospital_phonenumber] }
        voice.call(options)
            .then(() => {
                return callAction;
            })
            .catch(console.log);
    }


}

module.exports = { makeCall };
