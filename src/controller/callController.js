
const connectClientToAService = async (req, res) => {
    let responseAction = `
    <Response>
        <Dial phoneNumbers="+254714562752" maxDuration="5">
            <Say>Please! wait as we connect you to patient reaching to you</Say>
        </Dail>
    </Response>`
    return res.send(responseAction);
}

module.exports = {
    connectClientToAService
}