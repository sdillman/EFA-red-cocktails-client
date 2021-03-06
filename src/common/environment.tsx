let APIURL: string = '';

switch (window.location.hostname) {
    //this is the local host name for react app
    case 'localhost':
    case '127.0.0.1':
    case '10.0.0.212': // TODO: Remove this literal IP address
        //this is the local host name of your API
        APIURL = 'http://10.0.0.212:3000';
        break;
    //this is the depoloyed react app - model from blue badge project
    case 'sd-efa-red-lets-talk-cocktails.herokuapp.com' :
        APIURL = 'https://sd-efa-red-cocktails-server.herokuapp.com';
        break;
}

export default APIURL;
