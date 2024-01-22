Git can be very confusing, but iit is a lot simpler than I originally made it out to be.

Gitlens is very helpful.

**AWS Server**
- Not as hard to create as I imagined
- ssh keys stored as a file
- ssh -i production.pem ubuntu@54.158.215.142

**Caddy** 
- Caddy is a web service that listens for incoming HTTP requests
- Caddy is used to serve application
- __Important Caddy files__:
  - Configuration file - Contains the definitions for routing HTTP requests that Caddy receives. This is used to determine the location where static HTML files are loaded from, and also to proxy requests into the services you will create later.
  - HTML file = This is the directory of files that Caddy serves up when requests are made to the root or your web server.
