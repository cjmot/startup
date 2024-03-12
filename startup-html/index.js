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

apiRouter.delete('/cartItem/:id', (req, res) => {
    const itemId = req.params.id;
    cartItems = deleteCartItem(itemId, cartItems);
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
    return [...cartItems, newItem];
}

function deleteCartItem(itemId, cartItems) {
    const index = cartItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
        cartItems.splice(index, 1);
    }
    return cartItems;
}