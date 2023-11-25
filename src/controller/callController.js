'use strict';
require('dotenv').config();

const connectClientToAService = async (req, res) => {
    let responseAction = `
    <Response>
        <Dial 
        phoneNumbers="${process.env.CLIENT_NUMBER}"
        ringbackTone="https://tiba-connect.azurewebsites.net/music/playme.mp3"
        />
    </Response>`
    return res.send(responseAction);
}

module.exports = {
    connectClientToAService
}