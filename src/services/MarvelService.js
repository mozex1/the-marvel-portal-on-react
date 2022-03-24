import { useHttp } from "../hooks/http.hook";

const useMarvelService = () =>  {
	const {loading, error, request, cleanError} = useHttp();

    const _apiBase = `https://gateway.marvel.com:443/v1/public/`;
    const _apiKey = `apikey=16776d21af006d5c271dc36e1c724091`;
	const _baseOffset = 210;
	const _baseOffsetComics = 8;



	const getAllCharacters = async (offset = _baseOffset) => {
		try {
			const characters =  await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
			return characters.data.results.map(_transformCharacter);
		} catch(e) {
			throw e;
		}
	}

	const getCharacter = async (id) => {
		try {
			const character = await request(`${_apiBase}characters/${id}?${_apiKey}`);
			return _transformCharacter(character.data.results[0]);
		} catch(e) {
			throw e;
		}
	}

	const getAllComics = async (offset = _baseOffsetComics) => {
		try {
			const comics = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
			return comics.data.results.map(_transformComics);
		} catch(e) {
			throw e;
		}
	}

    const _transformCharacter = (char) => {
		const obj = {
			name: char.name,
			description: char.description,
            thumbnail: char.thumbnail.path + `.` + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
			id: char.id,
			comics: char.comics.items
		}
		if(obj.description.length > 150) {
			obj.description = obj.description.slice(0, 150) + "...";
		}
		Object.keys(obj).forEach(item => {
			if (!obj[item]) {
				obj[item] = 'No more information.';
			}
		});
		return obj;
	}

	const _transformComics = (comics) => {
		const obj = {
			id: comics.id,
			title: comics.title,
            thumbnail: comics.thumbnail.path + `.` + comics.thumbnail.extension,
			urls: comics.urls[0].url,
			price: comics.prices[0].price,
		}
		!obj.price ? (obj.price = 'Is unknown') : (obj.price += '$');


		return obj;
	}

	return {
		loading,
		error,
		cleanError,
		getAllCharacters,
		getCharacter,
		getAllComics
	}
}

export default useMarvelService;