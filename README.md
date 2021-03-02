# simple-personal-gradebook

A MEAN stack web application that aims to help students manage their grades. Students can use the application in the event that their instructor does not keep an up-to-date, accurate gradebook, allowing them to calculate their grade and test out changes (i.e. "what if" scenarios).

![Card Page](https://i.imgur.com/dsYjz3W.png)

## Demo

First, users register an account.
![App homepage.](https://user-images.githubusercontent.com/9027551/109595776-244b1f80-7ae3-11eb-82ca-624eff6386a4.png)

Then they will see a screen where they can add the classes they are taking.
![Gradebooks screen.](https://user-images.githubusercontent.com/9027551/109596238-d682e700-7ae3-11eb-9fe5-f934962ac4ed.png)

Gradebooks are represented in cards.
![gradebooks created](https://user-images.githubusercontent.com/9027551/109596261-e0a4e580-7ae3-11eb-800e-896a76d32db1.png)

Upon clicking a gradebooks name, it will be opened.
![fresh gradebook](https://user-images.githubusercontent.com/9027551/109596284-f1edf200-7ae3-11eb-8449-4acde86d7b32.png)

Users can then enter their grades. Information is updated on the server as the user types. Similar to Google Docs.
![gradebook filled out](https://user-images.githubusercontent.com/9027551/109596314-0205d180-7ae4-11eb-9364-d4c95cbc034e.png)

The entered information will be upgraded in the gradebook listing.
![final](https://user-images.githubusercontent.com/9027551/109596325-06ca8580-7ae4-11eb-8c44-10ddd9e87209.png)


# Build & Run

Dependencies:
* Node.js
* MongoDB

Ensure Mongo listens on port 27017.

```
mongod
npm run build
npm start
```
