
const connectClientToAService = async (req, res) => {
    let responseAction = `<Response><Dial phoneNumbers="" maxDuration="5"/></Response>`
    return res.send(responseAction);
}

module.exports = {
    connectClientToAService
}