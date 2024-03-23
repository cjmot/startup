const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const {updateCartItems} = require("./database");

const authCookieName = 'token';

// Service port, in production front-end code statically hosted by service on same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up front-end static content hosting
app.use(express.static('public'));

app.set('trust proxy', true);

// Router for service endpoints
var apiRouter = express.Router();
app.use('/api', apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) =>{
    if (await DB.getUser(req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await DB.createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

// GetUser returns info about user
apiRouter.get('/user/:email', async (req, res) => {
    const user = await DB.getUser(req.params.email);
    if (user) {
        const token = req?.cookies.token;
        res.send({ email: user.email, authenticated: token === user.token });
        return;
    }
    res.status(404).send({ msg: 'Unknown' });
});

var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
})

// Get cart
secureApiRouter.get('/products', async (req, res) => {
    const products = await DB.getProducts();
    res.send(products);
});

secureApiRouter.post('/product', async (req, res) => {
    const product = req.body;
    await DB.addProduct(product);
    const products = await DB.getProducts();
    res.send(products);
});

secureApiRouter.delete('/cartItems/delete', async (req, res) => {
    await updateCartItems(req.body.email, Number(req.body.id))
    const cartItems = await DB.getCartItems(req.body.email)
    res.send(cartItems);
});

secureApiRouter.post('/cartItems', async (req, res) =>{
    const cartItem = req.body;
    await DB.addCartItem(cartItem);
    const cartItems = await DB.getCartItems(req.body.email);
    res.send(cartItems);

})

secureApiRouter.get('/cartItems', async (req, res) => {
    const cartItems = await DB.getCartItems(req.body)
    res.send(cartItems)
})

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
})

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}
