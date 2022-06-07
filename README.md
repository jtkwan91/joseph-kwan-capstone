# D&D Character Chest

For my capstone project I made an app that you can login, create, track and delete characters. It is based off of the 5e Dungeons and Dragons.

I used react, knex, express, sass, mysql, and axios as my tech stack.  You're able to sign up for an account, login, create a character using a form that populates some stats and modifiers automatically, track and edit that character as you play, or delete it when you're done with it.  There is also a player's handbook 

http://www.dnd5eapi.co/ was the main API.

There are additional features I wanted to add including more subraces, classes, subclasses, equipment details etc.

Desktop Screenshots:

<img src="https://user-images.githubusercontent.com/90243125/152275503-c408ced3-3545-4efb-b0a7-39414b757350.PNG" width="200" height="100">
<img src="https://user-images.githubusercontent.com/90243125/152275506-7043ace7-8a98-47d6-8562-960d9744af66.PNG" width="200" height="100">

Mobile Screenshots:

<img src="https://user-images.githubusercontent.com/90243125/172281636-7fe52633-6deb-4bbb-b602-f673438f5485.png" width="100" height="200">
<img src="https://user-images.githubusercontent.com/90243125/172281644-86793a0b-0ab3-440b-9e4e-93afa4146e65.png" width="100" height="200">
<img src="https://user-images.githubusercontent.com/90243125/172281649-e019435d-6bde-44f8-bf5c-c45f16e6b26d.png" width="100" height="200">



To run this project, you must first start the express server and setup the database,


```sh
$ Open MySQL and create a new scheme called dnd 

```

```sh
$ cd server
$ npm i
$ docker-compose up -d // This is for Docker setup only
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
