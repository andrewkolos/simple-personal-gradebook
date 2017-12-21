# Back-end Routes

## Gradebooks
`GET` */gradebook/*
Returns all `Gradebook` objects associated with the signed in user.

`GET` */gradebook/:id*
Returns the gradebook with the specified `id`.

`PATCH` */gradebook/:id*
Request body: a `Gradebook` object.
Updates the `Gradebook` with the matching `id`.

`POST` */gradebook/*
Request body: a `Gradebook` object.
Saves a the new `Gradebook`.

`DELETE` */gradebook/:id*
Deletes the `Gradebook` object with the matching `id`.

## User
*/user/*

`POST` */user/*
Request body: a `User` object.
Encrypts password and creates a new `User`.

`POST` */user/signin*
Request body: a `User` object.
Attempts to sign the user in. Returns an object containing a `token`, a `userId`, and `username`.
