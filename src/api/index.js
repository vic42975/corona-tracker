import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
	let changeableURL = url;

	if (country) {
		changeableURL = `${url}/countries/${country}`;
	}

	try {
		const {
			data: { confirmed, recovered, deaths, lastUpdate },
		} = await axios.get(changeableURL);

		return { confirmed, recovered, deaths, lastUpdate };
	} catch (error) {
		return error;
	}
};

export const fetchDailyData = async () => {
	try {
		//this is the new API
		// const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');

		// new daily
		const { data } = await axios.get(`${url}/daily`);

		const modifiedData = data.map((dailyData) => ({
			date: dailyData.reportDate,
			confirmed: dailyData.confirmed.total,
			deaths: dailyData.deaths.total,
		}));

		return modifiedData;
	} catch (error) {
		return error;
	}
};

export const fetchCountries = async () => {
	try {
		const {
			data: { countries },
		} = await axios.get(`${url}/countries`);

		return countries.map((country) => country.name);
	} catch (error) {}
};
