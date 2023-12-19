const Hackathon = require('./structures/Hackathon')

const fetch = require('./utils/fetch')

class DevPostAPI {
    constructor() {
        this.baseAPI = 'https://devpost.com/api';
    }

    /**
     * 
     * @param {string} path Base URL
     * @param {string} base 
     * @returns {Promise<Object>} JSON Response
     */
    get(url) {
        return fetch(url)
    }

    /**
	 * Get hackathons from page.
	 * @returns {Promise<Object[]>} Schema
	 */
    getHackathons(page, status = []) {
        if (!page) page = 0
        if (!Array.isArray(status)) status = [status];

        const statusQuery = `&status[]=${status.join('&status[]=')}`;
        return this
            .get(`${this.baseAPI}/hackathons?${statusQuery}&page=${page}`)
            .then(json => json.data.hackathons.map(hackathon => new Hackathon(hackathon)));

    }


    async getAllHackathons(status = []) {
        // Get Pages
        if (!Array.isArray(status)) status = [status];
        const statusQuery = `&status[]=${status.join('&status[]=')}`;
        let pageRes = await this.get(`${this.baseAPI}/hackathons?${statusQuery}&page=0`);
        let pageCount = (Math.ceil(pageRes.data.meta.total_count / pageRes.data.meta.per_page));

        // Get Whole Hackathon List
        let hackathonList = [];
        for (let i = 1; i <= pageCount; i++) {
            hackathonList[i] = await this.getHackathons(i, status);
        }
        await Promise.all(hackathonList);
        return hackathonList.flat(); 
    }



}

module.exports = DevPostAPI;

