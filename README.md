# Attache

So far, this is just an experiment to understand the kind of workflow that would work well for building an Are.na + React Native app (very much inspired by @jc4p and his [WIP Are.na App](https://github.com/jc4p/ReactiveArena)). We started with authentication because, well, no one wants to do auth.

Once logged in, two things are stored in localStorage, an auth token (retrieved via `new AuthToken().getSessionToken()` ) and the current user (retrieved via `new CurrentUser.getCurrentUser()`). There's probably a less convoluted way of doing this!

All API calls should live in `lib/arena.js`. We also agree with @jc4p, it would be cool to do this in a node_module that anyone could install.

## Running locally

To run the app locally, you first need to install some tooling, see [React Native's Getting Started](https://facebook.github.io/react-native/docs/getting-started.html). Once you have `react-native-cli` installed, clone this repository and:

- `cd attache`
- `npm install`
- `react-native run-ios`
- `npm start`

## Contributing

Please, help us :)
See [CONTRIBUTING](CONTRIBUTING.md).