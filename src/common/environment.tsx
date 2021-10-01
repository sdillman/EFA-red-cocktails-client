let APIURL: string = '';

switch (window.location.hostname) {
    //this is the local host name for react app
    case 'localhost' || '127.0.0.1':
        //this is the local host name of your API
        APIURL = 'http://localhost:3000';
        break;
    //this is the depoloyed react app - model from blue badge project
    case 'sd-efa-red-lets-talk-cocktails.herokuapp.com' :
    APIURL = 'https://sd-efa-red-lets-talk-cocktails.herokuapp.com'
}

export default APIURL;
