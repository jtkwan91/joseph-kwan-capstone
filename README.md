# D&D Character Chest

For my capstone project I made an app that you can login, create, track and delete characters. It is based off of the 5e Dungeons and Dragons.

To run this project, you must first start the express server and setup the database,

'''sh
$ Open MySQL and create a new scheme called dnd

````

```sh
$ cd server
$ npm i
$ knex migrate:latest
$ npm start
````

You will see the following message:

```none
app running on port 8080
```

In another terminal start the React app normally,

```sh
cd client
$ npm i
$ npm start
```

And access the app by visiting

```none
http://localhost:3000
```
