const axios = require('axios');

// // Return List of Hackathons
// async function getHackathons() {
//     try {
//         const response = await axios.get('https://devpost.com/api/hackathons?status[]=open');
//         return response;
//     }
// 	catch (error) {
//         console.error(error);
//     }
// }
// getHackathons(4)
//     .then(response => {
//         const hackathonList = response.data.hackathons;
//         const hackJSONList = hackathonList.map(element => JSON.parse(JSON.stringify(element)));
//         console.log(hackJSONList);

//         const meta = response.data.meta;
//         const pages = Math.ceil(meta.total_count / meta.per_page);
//         console.log(`Page Count: ${pages}`);
//     })
//     .catch(error => {
//         console.error(error);
//     });


class DevPostAPIWrapper {
    #URL = 'https://devpost.com/api';
    // devpostCache = new NodeCache({ stdTTL: 0 });

    
    async #getDevPostAPI(endpoint) {
        try {
            /* Send Request to Get the Page Amount */
            // Response Object
            const pageResponse = await axios.get(`${this.#URL}${endpoint}&page=0`);
            // Meta Data Containing Pages Amount
            const meta = pageResponse.data.meta;
            const pages = Math.ceil(meta.total_count / meta.per_page);
            
            //console.log(pageResponse)
            const hackJSONList = [];
           
            for (let i = 0; i < pages; i++) {
                const hackResponse = await axios.get(`${this.#URL}${endpoint}&page=${i}`);
                console.log("Page Number", i)
                const hackData = await hackResponse.data.hackathons
                hackJSONList[i] = hackData;
            }

            await Promise.all(hackJSONList);

            
            return hackJSONList.flat();
        } catch (error) {
            console.error(error);
            throw error;  // Rethrow the error so that the caller can handle it if needed
        }
    }

   

    async getHackathons(status) {
        const response = await this.#getDevPostAPI(`/hackathons?status[]=${status}`);
        return response;
        
    }

    // async hackAndCache(status)

    // cache and compare
    // t1 = send Request
    // t2 = get cache 
    // if cache:
    //     compare t1 and t2 (see the difference between )
    //     return differeince
    // cache new data
    // else cache #no cacehe
    //     return req

    
}


module.exports = { DevPostAPIWrapper };