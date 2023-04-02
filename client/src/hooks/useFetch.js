import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, initialData) => {
	const [data, setData] = useState(initialData);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		axios(url)
			.then((res) => {
				setData(res.data);
			})
			.catch(() => {
				setError('Server Error. Try again later :(');
			})
			.finally(() => setLoading(false));
	}, [url]);

	return { data, loading, error };
};

export default useFetch;
