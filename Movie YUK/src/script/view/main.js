import '../component/movie-list';
import '../component/search-bar';
import DataSource from '../data/data-source';
import $ from 'jquery';

const main = () => {
    const searchElement = document.querySelector('search-bar');
    const movieListElement = document.querySelector('movie-list');


    const renderResult = (results) => {
        movieListElement.movies = results;
    };


    const showMovie = async () => {
        try {
            const result = await DataSource.showMovies();
            renderResult(result);
        } catch (message) {
            fallbackResult(message);
        }
    };
    const fallbackResult = (message) => {
        movieListElement.renderError(message);
        $('search-result').hide();
    };
    const onButtonSearchClicked = async () => {
        try {
            $('html, body').animate({ scrollTop: 0 }, 'fast');
            if (searchElement.value === '') {
                showMovie();

                $('search-result').hide();
            } else {
                $('search-result').show();
                const result = await DataSource.searchMovies(searchElement.value);

                renderResult(result.results);
            }
        } catch (message) {
            fallbackResult(message);
        }
    };

    showMovie();
    searchElement.clickEvent = onButtonSearchClicked;
};

export default main;