# @joph-auth/nd-otp-webcrypto

`@joph-auth/nd-otp-webcrypto` is a simple, no dependency, library for generating and verifying HOTP and TOTP tokens.

This package uses the [web crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API) 
and therefore can only be used where `window.crypto` and `window.crypto.subtle` are available.

For compatibility with the [NodeJS Crypto module](https://nodejs.org/api/crypto.html), 
you should use `@joph-auth/nd-otp-nodecrypto` instead.

**Note: The web and node versions of this package are fully compatible with each other.**

**WARNING: This has been created solely for educational purposes and 
should not be used to encrypt sensitive data in real world applications.**

## Installing pre-built package

The package is published on npm and can be installed with

`npm install --save @joph-auth/nd-otp-webcrypto`

or

`yarn add @joph-auth/nd-otp-webcrypto`

The package contains 3 builds.
- `dist/lib-cjs` - Default - Built for CommonJS modules.
- `dist/lib-esm` - Built for ES2020 modules.
- `dist/web-bundle` - Bundled for direct use in browsers.

## Usage

### CommonJS
```javascript
const { genOtp, checkOtp } = require('@joph-auth/nd-otp-webcrypto');

async function example() {
  const base32Key = 'Q4CU IAEF WX36 N2AP LBGT K7CI MLDG DBHJ';
    const otp = await genOtp(base32Key);
    console.log(otp);

  // TODO: checkOtp
}
```

### ES Modules
```javascript
import { genOtp, checkOtp } from '@joph-auth/nd-otp-webcrypto/dist/lib-esm';

async function example() {
  const base32Key = 'Q4CU IAEF WX36 N2AP LBGT K7CI MLDG DBHJ';
  const otp = await genOtp(base32Key);
  console.log(otp);

  //TODO: checkOtp
}
```

### Web Bundle
For the web bundle simply copy the `dist/web-bundle/nd-otp.min.js` and `dist/web-bundle/nd-otp.min.js.map` files to your project and load in a script element.

This will instantiate the `window.ndOtp` object.
```html
<html>
  <head>
    <title>No Dependency OTP Tokens</title>
  </head>
  <body>
    <script src="path/to/nd-otp.min.js"></script>
    <script>
        const base32Key = 'Q4CU IAEF WX36 N2AP LBGT K7CI MLDG DBHJ';
        ndOtp.genOtp(base32Key).then(otp => {
          console.log(otp);
        });

        //TODO: checkOtp

    </script>
  </body>
</html>
```

## Build from source
You can clone this repo and build manually.

Run `yarn` or `npm install` to install dev dependencies.

Scripts included in `package.json` are;
- `build:cjs` - Builds the library for CommonJS modules.
- `build:esm` - Builds the library for ES modules.
- `build:web` - Builds the un-minified web bundle.
- `build:web:min` - Builds the minified web bundle.
- `build` - Builds all of the above.
