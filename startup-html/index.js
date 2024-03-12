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

apiRouter.delete('/cartItems/delete/:id', (req, res) => {
    const itemId = Number(req.params.id);
    cartItems = cartItems.filter(item => item.id !== itemId)
    res.send(cartItems);
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

// cart items saved in memory and disappear whenever the service is restarted.
let cartItems = [];
function addCartItem(newItem, cartItems) {
    return [...cartItems, newItem];
}
