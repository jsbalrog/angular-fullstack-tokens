#angular-fullstack-tokens
This is a fork of daftfmonk's excellent [generator-angular-fullstack](https://www.npmjs.org/package/generator-angular-fullstack). Its main difference is it uses token-based authorization for ease of use in a service environment.

It is not a generator; rather, it is an already-generated skeleton or "seed" project for the following technologies:

* angularjs
* nodejs
* express
* passport with Json Web Tokens
* SASS/Compass

To use, clone repo, then run `npm install`.

To launch the server, run `grunt serve`.

`grunt serve` will watch client files in `app/`, and server files inside `lib/`, restarting the Express server when a change is detected.

## Deployment

To generate a dist folder that can easily be deployed use:

```bash
grunt
```

This will run unit tests, jshint, concatenate and minify scripts/css, compress images, add css vendor prefixes, and finally copy all files to a tidy dist folder.

Alternatively to skip tests and jshint, use:

```bash
grunt build
```

### Heroku Deployment

We provide an extremely simplifed deployment process for heroku.

`yo angular-fullstack:deploy heroku` generates a `dist` folder that is deployment ready  for [heroku.com](http://heroku.com/).

**Create and Deploy an app in 4 steps**

1. `mkdir foo && cd foo`

2. `yo angular-fullstack`

3. `yo angular-fullstack:deploy heroku`

4. `cd dist && git push heroku master`

5. Optional (if using mongoDB) `heroku addons:add mongohq`

That's it! Your app should be live and shareable. Type `heroku open` to view it.  
