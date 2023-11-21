
const connectClientToAService = async (req, res) => {
    let responseAction = `
    <Response>
        <Dial phoneNumbers="+254711959117" maxDuration="5">
            <Say>Please! wait as we connect you to a person reaching to you.</Say>
        </Dail>
    </Response>`
    return res.send(responseAction);
}

module.exports = {
    connectClientToAService
}