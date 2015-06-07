# OAuth 2

We have 2 applications: 
1. Web App - served by nginx
1. Auth server - running node.js

User Flow

1. Julie browse app.my-server.com. 
1. She clicks the 'login' link: auth.my-server.com?redirect_uri=app.my-server.com/auth
1. The auth server serves html page with a login form.
1. Julie enter her user/password and the auth server redirect to app.my-server.com/auth?identity_token=233224&something_else=554535

https://tools.ietf.org/html/rfc6749#section-4.2
