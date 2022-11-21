import noAvailablePoster from '../../img/no-image-available-poster.png'; 
import noAvailableBackdrop from '../../img/no-image-available-backdrop.png';       

class MoviesItem extends HTMLElement{
    constructor(){
        super();
        this.shadowDOM = this.attachShadow({mode: 'open'});
    }

    set movie(movie){
        this._movie = movie;

        if (this._movie.poster_path == null) {
            this._movie.poster_path = noAvailablePoster;
          } else {
            this._movie.poster_path = `https://www.themoviedb.org/t/p/w220_and_h330_face${this._movie.poster_path}`;
          }

        // backdrop path 
        if (this._movie.backdropPath == null) {
            this._movie.backdropPath = noAvailableBackdrop;
          } else {
            this._movie.backdropPath = `https://www.themoviedb.org/t/p/w500_and_h282_face${this._movie.backdropPath}`;
          }
        
          // release
      if (this._movie.release_date === '') {
        this._movie.release_date = '-';
      }
  
      //overview
      if (this._movie.overview === '') {
        this._movie.overview = '-';
      }
      this.render();
    }


    render(){
        this.shadowDOM.innerHTML =`
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: sans-serif;
            }
            :host {
                display: grid;
                padding: 2rem;
                grid-template-columns: 300px 1fr;
                margin: 0 auto;
            }
            .poster-movie {
                width: 100%;
            }
            .backdrop-movie {
                display: none;
              }
            .movie-info {
                padding: 30px;
                background-color: #8EC3B0;
                color: black;
                border-radius: 0 50px 50px 0;
            }
            .movie-info > h2 {
                font-weight: bold;
            }
            .movie-info > h2 > .year-release {
                font-weight: bold;
                color: black;
            }
            .movie-info > .title {
                margin-top: 20px;
                font-weight: bold;
                font-size: 20px;
            }
            .movie-info > p {
                margin-top: 8px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 10; /* number of lines to show */
            }
            @media screen and (max-width: 742px) {
                :host {
                    display: block;
                    margin-bottom: 20px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                    border-radius: 15px;
                    overflow: hidden;
                  }
                  .poster-movie {
                    display: none;
                }
                  .backdrop-movie {
                    display: block;
                    width: 100%;
                    max-height: 300px;
                    object-fit: cover;
                    object-position: center;
                  }
                  .movie-info {
                    border-radius: 0 0 30px 30px;
                    padding-bottom: 30px;
                }
            }
        </style>

        <img class="backdrop-movie" src="${this._movie.backdropPath}" alt="Backdrop Movie">
        <img class="poster-movie" src="${this._movie.poster_path}" alt="Poster Movie">
        <div class="movie-info">
          <h2>${this._movie.original_title} <span class="year-release">(${this._movie.release_date.slice(0, 4)})</span></h2>
          <p class="title">Overview Movie</p>
          <p>${this._movie.overview}</p>
          <p class="title">Release Date</p>
          <p>${this._movie.release_date}</p>
        </div>
        `;
    }
}

customElements.define('movie-item', MoviesItem);