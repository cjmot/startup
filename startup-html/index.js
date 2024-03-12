const express = require('express');
const app = express();

// Service port, in production front-end code statically hosted by service on same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use('/api', apiRouter);

// Get cart
apiRouter.get('/cartItems', (_req, res) => {
    res.send(cartItems);
});

apiRouter.post('/cartItem', (req, res) => {
    cartItems = addCartItem(req.body, cartItems);
    res.send(cartItems);
});

apiRouter.delete('/deleteCartItem', (req, res) => {
    cartItems = deleteCartItem(req.body, cartItems);
    res.send(cartItems);
})

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// updateCartItems updates cartItems with a new cart item
// cart items saved in memory and disappear whenever the service is restarted.
let cartItems = [];
function addCartItem(newItem, cartItems) {
    cartItems.push(newItem);
    return cartItems;
}

function deleteCartItem(newItem, cartItems) {
    let found = false;
    for (const [i, item] of cartItems.entries()) {
        if (item.values === newItem.values) {
            found = true;
            cartItems.splice(i, 1);
            return cartItems;
        }
    }
}