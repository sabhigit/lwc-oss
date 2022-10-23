import { LightningElement } from "lwc";
import {getConnection} from 'services/conn';

export default class Header extends LightningElement {
    static renderMode = 'light';
    isConnected = false;

    login() {
        getConnection().then(conn=> {
           // body payload structure is depending to the Apex REST method interface.
            var body = { title: 'hello', num : 1 };
            conn.apex.get("/services/apexrest/vlocity_cmt/v2/cpq/carts/0Q04W000002eOmOSAU", body, function(err, res) {
            if (err) { return console.error(err); }
            console.log("response: ", res);
            // the response object structure depends on the definition of apex class
            });
        });
    }

    connectedCallback() {
        console.log("dd");
    }
}
