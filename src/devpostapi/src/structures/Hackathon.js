class Hackathon {
	constructor(hackathon) {
		this.title = hackathon.title;
		this.title = hackathon.title;
		this.displayed_location = hackathon.displayed_location;
		this.open_state = hackathon.open_state;
		this.thumbnail_url = hackathon.thumbnail_url;
        this.analytics_identifier =  hackathon.analytics_identifier;
        this.url = hackathon.url;
        this.time_left_to_submission = hackathon.time_left_to_submission;
        this.submission_period_dates = hackathon.submission_period_dates;
        this.themes = hackathon.themes;
        this.prize_amount = hackathon.prize_amount;
        this.registrations_count = hackathon.registrations_count;
        this.featured = hackathon.featured;
        this.organization_name = hackathon.organization_name;
        this.winners_announced = hackathon.winners_announced;
        this.submission_gallery_url = hackathon.submission_gallery_url;
        this.start_a_submission_url = hackathon.start_a_submission_url;
        this.invite_only = Boolean(hackathon.invite_only);
        this.eligibility_requirement_invite_only_description = hackathon.eligibility_requirement_invite_only_description;
	}

	
}

module.exports = Hackathon;