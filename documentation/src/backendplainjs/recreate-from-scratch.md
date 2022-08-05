# Recreate From Scratch

## Creating Package
Running npm init you will be asked some basic package information. Don't worry you can change them later
```bash
npm init
```


Now install some basic packages
```bash
npm install express
npm install body-parser
npm install -D nodemon
npm install dotenv
npm install sqlite3
npm install sequelize
npm install -D sequelize-cli
```

A package that helps autogenerating db migrations - so we don't have to write them from scratch
```bash
npm install sequelize-mig -D
```

The basic dependencies on the infamous Passport.JS authentication package - strategies 'local' & 'jwt'
```bash
npm install passport passport-local
npm install passport-jwt jsonwebtoken
```

Validation and CORS
```bash
npm install express-validator cors
```

Now initialize the project with sequelize related stuff
```bash
npx sequelize init
```


##

## Creating Package

Because VuePress applications are server-rendered in Node.js when generating static builds, any Vue usage must conform to the [universal code requirements](https://ssr.vuejs.org/en/universal.html). In short, make sure to only access Browser / DOM APIs in `beforeMount` or `mounted` hooks.

If you are using or demoing components that are not SSR friendly (for example containing custom directives), you can wrap them inside the built-in `<ClientOnly>` component:

##
