# I want a banana, not the entire jungle

## What?

In the last few day we made a big change to the way render html on the server.
Previously we wrapped the json we get from Bento in Presenters objects with the and passed them into our Jade templates.
I wrote about that [here](https://github.com/oren/oren.github.io/blob/master/posts/presenter/presenter.md).  
We decided to dump the Presenters and instead use small helper functions that act on a simple hash.

## Why?

1. The Presenters were overweight. Some of them where above 1000 lines that contained 150 functions.
2. Some page on yp.com uses the same JSON but need to display different things. for example - the home, mip and srp all need listing information, but showing different information.
We ended up using inheritance as a way to share common functionality and it quickly become a maintenance nightmare.
3. It would be nice to ask Bento for the exact information we need for a given feature.

The following quotes are spot-on:  

> "The problem with object-oriented languages is they’ve got all this implicit environment that they carry around with them. You wanted a banana but what you got was a gorilla holding the banana and the entire jungle." - Joe Armstrong

> "Sometimes, the elegant implementation is just a function. Not a method. Not a class. Not a framework. Just a function." - John Carmack

## Example

Let's look at the srp page as an example for the new approach.

handlers/srp.js
```js
var serviceAreaHelper = require('yp/helpers/search/service_area');
var addressHelper = require('yp/helpers/listings/address');
var organicHelper = require('yp/helpers/search/organic');
var adsHelper = require('yp/helpers/srp/ads');
var srpModel = require('yp/models/srp');

// Define explicitly which helpers we want to use.
var helpers = {
    serviceArea: serviceAreaHelper,
    address: addressHelper,
    organic: organicHelper,
    ads: adsHelper
};

// Assign all the helpers globally to the srp request context.
res.locals(helpers);

// Each model has a a load function that transofrm the raw json we get from Bento 
// into a nicer hash - it flattens it and do some type conversion if needed.
// for example, instead of srpModel.data.SearchResul.BusinessListing we have srpModel.organic
res.template('srp', {
    srpModel: srpModel.load(results.json),
    params: params
});
```

Here is the jade file that uses the ads helpers. Notice that we pass simple object as a parameter to rightTop()

views/srp.jade
```jade
- listings = ads.rightTop(srpModel.sponsored)

- each listing in listings
    li
        mixin srp-card-featured(listing, className)

```

The ads helper contain a few small functions:

helpers/srp/ads.js
```js
function centerTop(results) {
    return results.slice(0, 1);
}

function rightTop(results) {
    return results.slice(2, 3);
}

function rightMiddle(results) {
    return results.slice(4, 5);
}

function rightBottom(results) {
    return results.slice(6, 7);
}

module.exports = {
    centerTop: centerTop,
    rightTop: rightTop,
    rightMiddle: rightMiddle,
    rightBottom: rightBottom
};
```
