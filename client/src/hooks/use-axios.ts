import axios, {AxiosRequestConfig} from "axios";
import { useEffect } from "react";

const api = axios.create({
	baseURL: 'http://127.0.0.1:8000/api/v0',
	headers: {
		'Accept': '*/*',
		'Content-Type': 'application/json',
		// 'Access-Control-Allow-Origin': '*'
	}
})

// api.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const useAxios = (axiosParams: AxiosRequestConfig) => {
	// const [response, setResponse] = useState(null);
	// const [error, setError] = useState('');
	// const [loading, setLoading] = useState(true);
	let response = null;
	let error = null;
	let loading = true;

	const fetchData = () => {
		api.request(axiosParams)
			.then(res => response = res.data)
			.catch(err => error = err)
			.finally(() => loading = false)
	}

	useEffect(() => {
		fetchData();
	}, []);

	return {response, error, loading}
}

export {
	api,
	useAxios,
};
