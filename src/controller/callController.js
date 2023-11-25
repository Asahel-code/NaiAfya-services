'use strict';
require('dotenv').config();

const connectClientToAService = async (req, res) => {
    let responseAction = `
    <Response>
        <Dial 
        phoneNumbers="${process.env.CLIENT_NUMBER}"
        ringbackTone="https://5bb1-197-237-66-112.ngrok-free.app/music/playme.mp3"
        />
    </Response>`
    return res.send(responseAction);
}

module.exports = {
    connectClientToAService
}