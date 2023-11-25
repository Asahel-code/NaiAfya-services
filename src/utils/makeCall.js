'use strict';
require('dotenv').config();

const credentials = {
    apiKey: process.env.API_KEY,
    username: process.env.API_USERNAME
}

const AfricasTalking = require('africastalking')(credentials);

const voice = AfricasTalking.VOICE;

class makeCall {
    constructor({ service_phone_number, client_number }) {
        if (!service_phone_number) {
            throw new Error(
                'Missing required parameters: service_phonenumber'
            );
        }

        this.service_phone_number = service_phone_number;
        this.client_number = client_number;
    }



    async connectToService() {
        let callAction = `<Response><Say>Please wait as we connect you to a patient wishing to reachout</Say></Response>`;

        const options = { callFrom: process.env.AT_VIRTUAL_NUMBER, callTo: [this.service_phone_number] }
        try {
            await voice.call(options);
            return callAction;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


}

module.exports = { makeCall };
