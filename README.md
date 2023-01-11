# Project description: ConvInterest
The motivation behind the project is for people to find a place to interact randomly on any topic.

# How to run the app?:
1) Run `npm install` to load all the dependencies.
2) Run `npm run build` to build the app.
3) Run `npm start` to start the server where api requests will be served.
4) Run `npm run dev` to start the web app.

# Architecture:
1) The app follows the client server architecture.
2) Web interacts with express server using api's.

# How to explore the website?:
1) Follow the usual login flow.
2) Once logged in, you will see messages section on left side and active user count, active trends and interest management section on the sidebar.
3) Messages from `General` section are loaded by default when you log in.
4) You can switch to other interests board by selecting section from sidebar.
5) You can also subscribe/unsubscribe to different interests from sidebar.
6) At any point, you can see number of active users in sidebar section.

# Interests available:
1) GENERAL
2) ART
3) SPORTS
4) TRAVEL
5) TECHNOLOGY
6) OUTDOOR
7) GAMING
8) MUSIC

# API's Guide:
1) GET /api/session : Check if user is in session.
2) POST /api/session : Used for loggig user in.
3) DELETE /api/session : Delete user active session and log user out.
4) GET /api/users : Returns the active count for user.
5) GET /api/messages :category: Returns the list of messages by selected interest.
6) POST /api/messages : Add messages against a specific category.
7) GET /api/interests : Get interests user subscribed to.
8) POST /api/interests : Subscribe user to specific interest.
9) GET /api/interests/stats : Return the stats like number of messages used to show trends on the sidebar.

# Complex elements:
1) Used multiple apis following REST conventions.
2) Polling with `useEffect` to updated active users, load messages and trends.
3) Handled different level of authorization.
4) Switched to different pages to demonstrate conditional rendering.
5) Effectively handled 11 state using `useReducer` and action concepts.
6) Used 12 column grid to effectively manage UI.
7) Created ConvInterest logo by myself to enhance the look and feel.
8) Followed best security practices and validations.

# Future work:
1) Implement appropriate authentication.
2) Add ability to like, unlike and reply to messages.
3) Admin section to add more categories dynamically.

# Images and Icons
1) CI.gif : ConvInterest GIF created by me.