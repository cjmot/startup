import {getCartItems} from "./getCartItems";

export function onStart() {
    const email = localStorage.getItem("userName");
    if (!email) {
        console.log("not logged in");
    } else {
        document.getElementById("shopUser").innerHTML = email;
        getCartItems()
    }

}
