# Action types of the Messages Module

## Table of Contents

<!-- TOC depthFrom:2 depthTo:4 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Table of Contents](#table-of-contents)
- [Components Based Action types](#components-based-action-types)
	- [Input Area](#input-area)
		- [`INPUT_AREA__CHANGE`](#inputareachange)
- [Model Based Action types](#model-based-action-types)
	- [Message](#message)
		- [`MESSAGE__SENDING`](#messagesending)
		- [`MESSAGE__SENT`](#messagesent)
		- [`MESSAGE__SENT_REMOTE`](#messagesentremote)
		- [`MESSAGE__SEEN`](#messageseen)
		- [`MESSAGE__RECEIVED`](#messagereceived)
	- [Users](#users)
		- [`USERS__ADDED`](#usersadded)
	- [Conversation](#conversation)
		- [`CONVERSATION__SELECTED`](#conversationselected)

<!-- /TOC -->

## Components Based Action types

There are different Actions that are helping the Component to manage
itself. So to say, they are more like internal signals with the main purpose to
handle an internal action. These ActionTypes are sorted by Component.

### Input Area

#### `INPUT_AREA__CHANGE`

Whenever the User changes the content of the Input Bar at the center-bottom, this action is called.

##### Example
```js
{
  type: "INPUT_AREA__CHANGE",
  text: "This is the users new input..."
}
```

## Model Based Action types

These Actions are more about changes to the data, so it is not processing an internal signal of a component but a change to one (or more) dataStores that can have multiple effects on different Components. These Signals are sorted by the Datatype they belong to.


### Message

#### `MESSAGE__SENDING`

This action appears, when the user intends to send a message. The Message is not sent yet, but it is already in the process of being delivered to the server. A `localId` is assigned to that message to reference it in future processing.

##### Example
```js
{
  type: "MESSAGE__SENDING",
  text: "Hey John!",
  localId: "3940495",
  user: "mike-schnorr",
  time: "1481036426535",
  conversationId: "conversation005",
}
```

#### `MESSAGE__SENT`

This action appears, when sending was successfully completed at the server. The `localId` helps referencing to the message itself, the `id` is the ID, which is given from the server.

##### Example
```js
{
  type: "MESSAGE__SENT",
  localId: "3940495",
  id: "FLKJKJE-DJKLDJE-DIDL"
	conversationId: "conversation005",
}
```

#### `MESSAGE__SENT_REMOTE`

This action appears, when the a message from the User was send by another device. It doesn't contain a localId (because it doesn't need to be referenced), but instead contains all the other details, that are necessary for displaying the message correctly.

##### Example
```js
{
  type: "MESSAGE__SENT",
	text: "Hey John!",
  user: "mike-schnorr",
  time: "1481036426535",
  id: "FLKJKJE-DJKLDJE-DIDL"
	conversationId: "conversation005",
}
```


#### `MESSAGE__SEEN`

This action appears, when the message was seen by the other user. It uses the server id to reference to the message itself.

##### Example
```js
{
  type: "MESSAGE__SEEN",
  id: "FLKJKJE-DJKLDJE-DIDL",
	conversationId: "conversation005",
}
```


#### `MESSAGE__RECEIVED`

This action appears, when the user gets a new Message from another user.

##### Example
```js
{
  type: "MESSAGE__RECEIVED",
  text: "Hey Wolfgang!",
  id: "FLKJKJE-DJKLDJE-DIDL",
	conversationId: "conversation005",
  user: "mike-schnorr",
  time: "1481036426535",
}
```


### Users

#### `USERS__ADDED`

### Conversation

#### `CONVERSATION__SELECTED`

This action appears whenever the user intents to change to another conversation.

##### Example
```js
{
  type: "CONVERSATION__SELECTED",
  conversationId: "JLKJD540-DJLKJD332-JDK"
}
```
