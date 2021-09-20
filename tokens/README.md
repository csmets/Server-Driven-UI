# Tokens

This module is used to generate styling tokens that can be used across different clients.

For example, themes. If all clients use these tokens, if a change occurs all clients will have updated styles.

## Getting started

To install, run:

```
npm ci
```

To generate tokens, run the following command:

```
npm run generate
```

The tokens are to be used within `web-app`. To enable it's usage within the `web-app` package, run the following command:

```
npm link
```