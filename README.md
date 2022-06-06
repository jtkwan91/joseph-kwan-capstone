# D&D Character Chest

For my capstone project I made an app that you can login, create, track and delete characters. It is based off of the 5e Dungeons and Dragons.

I used react, knex, express, sass, mysql, and axios as my tech stack.  You're able to sign up for an account, login, create a character using a form that populates some stats and modifiers automatically, track and edit that character as you play, or delete it when you're done with it.  There is also a player's handbook 

http://www.dnd5eapi.co/ was the main API.

There are additional features I wanted to add including more subraces, classes, subclasses, equipment details etc.

![charlist](https://user-images.githubusercontent.com/90243125/152275503-c408ced3-3545-4efb-b0a7-39414b757350.PNG)

![chardeets](https://user-images.githubusercontent.com/90243125/152275506-7043ace7-8a98-47d6-8562-960d9744af66.PNG)


To run this project, you must first start the express server and setup the database,

```sh
$ Open MySQL and create a new scheme called dnd

```

```sh
$ cd server
$ npm i
$ knex migrate:latest
$ npm start
```

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
