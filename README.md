# Song frontend
## Setup
1. Clone the project
```shell
git clone git@github.com:abenezer-ayalneh/song-frontend.git
```
2. Checkout the ```main``` branch
```shell
git checkout main
```
3. Copy the ```.env.example``` file to ```.env``` file
```shell
cp .env.example .env
```
4. Install packages
```shell
npm install
```
5. Run the development server
```shell
npm run dev
```

## Task
The frontend part of your app should primarily show a list of songs and enable clients to
create, update, and delete songs. In addition, it should have a section where the statistics
data is shown. It should utilize the backend Rest API you built to fulfill the functionalities.
### Technologies
Use the technologies below to create your frontend web application:
- **Typescript** : use typescript to write your codes. Try not to use the type Any as
much as possible.
- **ReactJS**: To build your user interface.
- **Redux Toolkit**: To manage the state of your app. You should first read about redux
to learn the core concepts.
- **Redux - Saga**: To make calls to your Rest API.
- **Emotion and Styled system**: To style your app.
- Whenever a song is added, updated, or deleted, the latest changes should be shown
without reloading the page.
