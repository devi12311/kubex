# Nebula React Starter

> This project was bootstrapped with [CRACO (Create React App Configuration Override)](https://github.com/gsoft-inc/craco#readme).

## Tech stack

- [React](https://reactjs.org/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html/)
- [Redux](https://redux.js.org/)
- [Tailwindcss](https://tailwindcss.com/)

## Project setup

> Use yarn

```
* cp .env.example .env
* yarn install
* yarn start
```


## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

##Project structure:
```
* assets
* components
* core
* hoc
* hooks
* i18n
* pages
* redux
* router
* services
* utils
```

###Assets:
`assets` directory is used to store media and styling files like css, images, svg, [animations](https://lottiefiles.com/) etc.

###Components:
`components` directory is where most of the logic will be placed. Components should be grouped in directories by entities.

###Constants:
`constants` directory is where app constants are stored, such as API_URL, FALLBACK_LANG and redux action types`.

###Core:
`core` directory contains web components that are used across the app. These atomic components are components that cannot be broken down into smaller pieces.

###Hoc:
`hoc` (High Order Components) directory is used to place high order components such as layout-wrappers, sidebars, partials etc. You can add header and footer files as partials for example.

###Hooks:
`hooks` directory is where our custom hooks will be placed allowing you to reuse stateful logic without changing your component hierarchy. You can extract stateful logic from a component so it can be tested independently and reused.

###i18n:
`i18n` directory is where the localization logic is stored. I18next is an internationalization-framework that provides plugins to: detect the user language, load translations, extension by using post-processing.

###Pages:
`pages` directory is where all the pages of the app will be stored. Pages should not handle much logic, to keep them easy to manage. The main logic will be placed in `components` folder as mentioned above.

###Redux:
`redux` directory is used to manage state globally using Redux. Redux is a pattern and library for managing and updating application state, using events called "actions". It serves as a centralized store for state that needs to be used across your entire application, with rules ensuring that the state can only be updated in a predictable fashion.

###Router:
`router` directory is where [React Router](https://reactrouter.com/) logic is store. The folder has the below structure
* `AuthRoute` component is the blueprint for all private routes in the application that require authentication.
* `GuestRoute` component is the model for all public only routes.
* `index`: where routes are declared.

###Services:
`services` directory is where we define all `HTTP` calls grouped by entities. To keep them centralized and easy to manage.


###Utils:
`utils` directory contains several utility programs and libraries such as helper functions, plugins etc.
Ex. `API.js` plugin is used to create and configure the axios client for `HTTP` requests.

