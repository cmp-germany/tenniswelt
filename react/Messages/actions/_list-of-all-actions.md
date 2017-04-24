# Action types of the Messages Module

## Table of Contents

<!-- TOC depthFrom:2 depthTo:4 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Table of Contents](#table-of-contents)
- [Components Based Action types](#components-based-action-types)
	- [Input Area](#input-area)
		- [`INPUT_AREA__CHANGE`](#inputareachange)
	- [CurrentView](#currentview)
		- [`CURRENT_VIEW__CHANGE`](#currentviewchange)
- [Model Based Action types](#model-based-action-types)
	- [Message](#message)
		- [`MESSAGE__SENDING`](#messagesending)
		- [`MESSAGE__SENT`](#messagesent)
		- [`MESSAGE__SENT_REMOTE`](#messagesentremote)
		- [`MESSAGE__SEEN`](#messageseen)
		- [`MESSAGE__RECEIVED`](#messagereceived)
	- [Conversation](#conversation)
		- [`CONVERSATION__SELECTED`](#conversationselected)
		- [`CONVERSATION__LOAD_LIST`](#conversationloadlist)
		- [`CONVERSATION__LIST_LOADED`](#conversationlistloaded)
		- [`CONVERSATION__LOAD`](#conversationload)
		- [`CONVERSATION__LOADED`](#conversationloaded)
	- [User](#user)
		- [`USER__LOAD`](#userload)
		- [`USER__LOADED`](#userloaded)

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

### CurrentView

#### `CURRENT_VIEW__CHANGE`

Whenever the User "navigates" through the content in the way, that he wants see another type of content he is currently viewing, this event is trigerred.

There are currently 3 different views, the user can navigate to: `CONTACT_LIST`, `MESSAGES`, `CONTACT_DETAILS`.

##### Example
```js
{
	type: "CURRENT_VIEW__CHANGE",
	toView: "MESSAGES",
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
  type: "MESSAGE__SENT_REMOTE",
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
  user: "mike-schnoor",
  time: 1481036426535,
}
```



### Conversation


#### `CONVERSATION__SELECTED`

This action appears whenever the user intents to change to another conversation.

##### Example
```js
{
  type: "CONVERSATION__SELECTED",
  fromConversationId: "old-conversation-id-12393",
  conversationId: "new-conversation-id-14394",
}
```


#### `CONVERSATION__LOAD_LIST`

This action appears in the initializing process. It notifies that the list of
Conversations should be loaded.

##### Example
```js
{
  type: "CONVERSATION__LOAD_LIST"
}
```


#### `CONVERSATION__LIST_LOADED`

This action appears when the initial load of the conversation is finished. It
includes all data of the loading results.

##### Example
```js
{
  type: "CONVERSATION__LIST_LOADED",
  conversations: [
    {
      id: "conversation005",
      user: {
        id: "17b713b9-0536-465f-b265-a6b700bfd4b2",
        name: "John Doe",
        avatar: "gfx/profilbilder/unknown.png",
      },
      preview: "ipsum wirklich langer Text",
      time: 1481554543234,
    },
  ]
}
```


#### `CONVERSATION__LOAD`

This action appears when a conversation is selected, and there is not yet any
data. This action will trigger loading messages of that conversation.

##### Example
```js
{
  type: "CONVERSATION__LOAD",
  conversationId: "conversation005",
}
```


#### `CONVERSATION__LOADED`

This action appears when a conversation was selected, the loading of that data was triggered and now the loading process is completed. This action contains the loaded messages.

##### Example
```js
{
  type: "CONVERSATION__LOADED",
  conversationId: "conversation005",
  messages: [
    ...
  ]
}
```



### User


#### `USER__LOAD`

This action appears when data from a user - which details hasn't been loaded yet - is requested. This action will trigger loading user details of that user.

##### Example
```js
{
  type: "USER__LOAD",
  userId: "userId49873",
}
```


#### `USER__LOADED`

This action appears when the loading of user data was triggered and now the loading process is completed. This action contains the details of the loaded user.

##### Example
```js
{
  type: "USER__LOADED",
  userId: "userId49873",
  user: {
    ...
  }
}
```
