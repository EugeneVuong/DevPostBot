const axios = require('axios');

module.exports = async (url) => {
    response = await axios.get(url)
    if (response.status >= 200 && response.status <= 299)
        return response
    throw new Error(res.statusText)
}   