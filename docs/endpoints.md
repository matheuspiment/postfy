# Index

- [Register an user](#register-an-user)
- [Login](#login)
- [Create a post](#create-a-post)
- [List posts](#list-posts)
- [Delete a post](#delete-a-post)
- [Search cities](#search-cities)

## Register an user

### URL

```
POST /register
```

### Parameters

| Parameter  | Description                  |
| ---------- | ---------------------------- |
| `name`     | Required. The user name.     |
| `email`    | Required. The user email.    |
| `password` | Required. The user password. |

### Response

This endpoint returns an HTTP 201 whenever the operation succeeds:

```json
{
  "user": {
    "_id": "5d9ca46827ef7c411e9874bd",
    "name": "Matheus Pimenta",
    "email": "matheus@gmailuol.com",
    "createdAt": "2019-10-08T14:35:00.132Z",
    "updatedAt": "2019-10-08T14:35:00.132Z"
  }
}
```

| Field            | Description             |
| ---------------- | ----------------------- |
| `user._id`       | The user ID.            |
| `user.name`      | The user name.          |
| `user.email`     | The user email.         |
| `user.createdAt` | The user creation date. |
| `user.updatedAt` | The user update date.   |

---

## Login

### URL

```
POST /login
```

### Parameters

| Parameter  | Description                  |
| ---------- | ---------------------------- |
| `email`    | Required. The user email.    |
| `password` | Required. The user password. |

### Response

This endpoint returns an HTTP 200 whenever the operation succeeds:

```json
{
  "user": {
    "_id": "5d9c719801cf6508a493edf9",
    "name": "Matheus Pimenta",
    "email": "matheus@bool.com",
    "createdAt": "2019-10-08T14:35:00.132Z",
    "updatedAt": "2019-10-08T14:35:00.132Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDljNzE5ODAxY2Y2NTA4YTQ5M2VkZjkiLCJpYXQiOjE1NzA1NzM3NzAsImV4cCI6MTU3MTE3ODU3MH0.MwbibnQpA3G9vGogwgzg0Y6rNTROXWN33fxH3kchP14"
}
```

| Field            | Description                                |
| ---------------- | ------------------------------------------ |
| `user._id`       | The user ID.                               |
| `user.name`      | The user name.                             |
| `user.email`     | The user email.                            |
| `user.createdAt` | The user creation date.                    |
| `user.updatedAt` | The user update date.                      |
| `token`          | The user JWT used to authorize operations. |

---

## Create a post

### URL

```
POST /create/post
```

> **Notice**: This is an authorized endpoint that need the `Authorization` header with the token provided by the [Login](#login) endpoint.

### Parameters

| Parameter | Description                 |
| --------- | --------------------------- |
| `text`    | Required. The post message. |

### Response

This endpoint returns an HTTP 201 whenever the operation succeeds:

```json
{
  "post": {
    "_id": "5d9cd7c49586f78342f54aac",
    "text": "Hello World",
    "user": "5d9c719801cf6508a493edf9",
    "createdAt": "2019-10-08T18:39:00.132Z",
    "updatedAt": "2019-10-08T18:39:00.132Z"
  }
}
```

| Field            | Description             |
| ---------------- | ----------------------- |
| `post._id`       | The post ID.            |
| `post.text`      | The post message.       |
| `post.createdAt` | The post creation date. |
| `post.updatedAt` | The post update date.   |

---

## List posts

### URL

```
GET /posts
```

> **Notice**: This is an authorized endpoint that need the `Authorization` header with the token provided by the [Login](#login) endpoint.

### Parameters

This endpoint does not expect parameters.

### Response

This endpoint returns an HTTP 200 whenever the operation succeeds:

```json
{
  "posts": [
    {
      "_id": "5d9cd7c49586f78342f54aac",
      "text": "Hello World",
      "user": "5d9c719801cf6508a493edf9",
      "createdAt": "2019-10-08T18:39:00.132Z",
      "updatedAt": "2019-10-08T18:39:00.132Z"
    }
  ]
}
```

> **Notice**: When no items are found, an empty array is returned.

| Field                    | Description             |
| ------------------------ | ----------------------- |
| `posts`                  | The posts array.        |
| `posts[index]._id`       | The post ID.            |
| `posts[index].text`      | The post message.       |
| `posts[index].createdAt` | The post creation date. |
| `posts[index].updatedAt` | The post update date.   |

---

## Delete a post

### URL

```
DELETE /post/:id
```

> **Notice**: This is an authorized endpoint that need the `Authorization` header with the token provided by the [Login](#login) endpoint.

### Parameters

This endpoint does not expect parameters.

### Response

This endpoint does not return a body, only an HTTP 204 response whenever the result is processed.

---

## Search cities

### URL

```
GET /cities?search={string}
```

### Parameters

This endpoint does not expect parameters.

### Response

This endpoint returns an HTTP 200 whenever the operation succeeds:

```json
{
  "cities": [
    "Victoria, BC, Canadá",
    "Victorville, CA, EUA",
    "Victoria, TX, EUA",
    "Victoriaville, Quebec, Canadá",
    "Victoria Falls, Zimbábue"
  ]
}
```

> **Notice**: When no items are found, an empty array is returned.

| Field           | Description                |
| --------------- | -------------------------- |
| `cities`        | The cities array.          |
| `cities[index]` | The city name/description. |
