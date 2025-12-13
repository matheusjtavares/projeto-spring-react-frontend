const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const API_GEOLOC_URL = process.env.NEXT_PUBLIC_GEOLOC_URL || 'http://localhost:8080';
export async function getAvistamentoElastic(query){
    const termo = query.trim();
    if(!termo){
        return [];
    }
    const response = await fetch(
        `${API_BASE_URL}/api/avistamentos/search/texto?texto=${termo}&page=0&size=20`
    );
    if(!response.ok){
        throw new Error(`Erro ao buscar avistamentos (${response.status})`);
    }
    const data = await response.json();
    return data;
}
export async function getGeoLocFromCity(cidade){
    const termo = cidade.trim();
    if(!termo){return null}
    const url = `${API_GEOLOC_URL}/search?format=json&limit=1&q=${
        encodeURIComponent(cidade)}`;
    //https://nominatim.openstreetmap.org/search?format=json&limit=1&q=rio%20de%20janeiro
    const response = await fetch(url,{
        headers: {
            'Accept': 'application/json',
        }
    });
    if(!response.ok){
        console.error(`Erro ao buscar geocoding (${response.status})`);
        return null;
    }
    const data = await response.json();
    if(!Array.isArray(data) || data.length === 0){
        console.error(`Erro ao buscar geocoding nao localizado)`);
        return null;
    }
    const item = data[0];
    return {
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
        displayName : item.display_name,
    };
    //{{ base_url }}/api/avistamentos/search/perto?lat=44.696379&lon=12.180427&distanciaKm=200&size=1
}
export async function getAvistamentosPorProximidade(cidade,distancia){
    const response = await fetch(
        `${API_BASE_URL}/api/avistamentos/search/perto?lat=${cidade.lat}&lon=${cidade.lon}&distanciaKm=${distancia}&size=200`
    );
    if(!response.ok){
        throw new Error(`Erro ao buscar avistamentos (${response.status})`);
    }
    const data = await response.json();
    return data;
}