class AppBar extends HTMLElement {
    constructor() {
      super();
      this.shadowDOM = this.attachShadow({mode: 'open'});
    }
   
    connectedCallback(){
      this.render();
    }
   
    render() {
      this.shadowDOM.innerHTML = `
        <style>
          * {
            margin: 0;
            padding: 0;
            align-items: center;
            box-sizing: border-box;
          }
          :host {
            display: block;
            width: 100%;
            align-items: center;
            background-color: #9ED5C5;
            color: black;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
          }
          h2 {
           
            align-items: center;
            padding: 16px;
          }
        </style>
        
        <h2>Movie Yuk </h2>
      `;
    }
  }
   
  customElements.define('app-bar', AppBar);