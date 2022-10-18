import { LightningElement } from 'lwc';
import {getConnection} from 'services/conn';

export default class App extends LightningElement {
    connectedCallback() {
        // getConnection();
        // conn.query('SELECT Id, Name FROM Account', (err, res) =>{
        //     if (err) { return console.error(err); }
        //     console.log(res);
        // });
    }

    login() {
        getConnection();
    }
    getContacts() {
        let x = getConnection();
        console.log("kjk", x);
    }
}
