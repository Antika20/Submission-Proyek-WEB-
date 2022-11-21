const apiKey  = 'd9a122f6f8a9995b9bd2d4631dfc5fe9';

class DataSource{
    static searchMovies(keyword){
        return fetch (`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`)
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.results.length !== 0) {
                return Promise.resolve(responseJson);
              } else {
                return Promise.reject(`Kata kunci "${keyword}" tidak ditemukan dalam database`);
              }
        });
    }

    static showMovies() {
        return fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`)
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.results.length !== 0) {
              return Promise.resolve(responseJson.results);
            } else {
              return Promise.reject('Gagal memuat Movie. Silahkan coba lagi.');
            }
          });
      }
    }


export default DataSource;