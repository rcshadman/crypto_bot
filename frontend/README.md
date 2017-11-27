# React app for the crypto bot

## Install

```
npm install / yarn install
```

## For development

```
npm start / yarn start
```

## For production

```
npm run build / yarn build
```

## Todo 

- Improve the middleware api, some functionalities do not fit its actual structure, as login because it lacks a callback or the delete alert because it doesn't accept an empty response
- Style... much styles...
- Add api error compatibility
- Add on the api some routes for the "is_active" variable of alerts but also to get the avaible currency ( crypto and exchange )
- Modify User, either change from Djoser or adapt a dynamic modification. Now the api has 3 urls to modify the user as : Change email / Change password / Change first name and last name.
- Add Sockets and browser notification to have the notifications in real time
- Adapt the api or the app to allow more than one device to have access to the account. Now the user connects from an other device, it disconnects the older one. 
- Make a real logout, that doesn't just delete locally the token
- Make more variables dynamic, as for now the url of the api if hardcoded, but not the paths.
