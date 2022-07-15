# Youtube Search

- This is an application that runs a cron job to cache a search querry from youtube.
- Provides search, paginated response fucntionality
- Provides an option to add unlimited youtube API credentials, on expiry a new one is taken for the next cron job

## Main Architecture and Process

- On starting of the server, it calls a function which starts only once
- The function first caches all present ids in Redis
- Then it creates a cron job that calls the youtube api in the background
- If a new video is found which is not in the redis cache its id is pushed in Redis and its info in DB
- Uses Mongoose Paginate to paginate results and MongoDB Atlas index search to provide search results based on predefined queris

## Tinkering Configs

- To change certain parameters eg the predefined query
- First flush the redis database
- Go to server/commonconfig.json you can change either the cron job schedule ( following the cron syntax (https://www.npmjs.com/package/node-cron)) or the predefined query
- You can also change seach parameters such as publishedAfter etc from server/search/searchConfig.json

## Installation and Setup

1. Install Docker

### Setup

- Create a `.env` file corrosponding to the values in `example.env` and put it inside the config folder
- This project uses MongoDB and Redis as DB and a cache service
- So you need to create create either a mongo cloud instance and a redis cloud instance and put corrosponding values in the .env file
- You may refer to https://cloud.mongodb.com/ and https://app.redislabs.com/ to create your instances
- set NODE_ENV=development in the `.env` file

- You also need to generate google API keys for the project ( refer https://developers.google.com/youtube/v3/getting-started)
- Once you have access to the keys create a json file withe the title `apiKeys.json` and put it in the config folder in the format given in `exampleAPIKeys.json`
- Now your set up is ready and you are good to go !

### Running the code

- In the same directory which contains the `Dockerfile` run the following commands

```
docker build -t '<dir_name>/<project_name>' .
docker run -it -p 8004:8004 '<dir_name>/<project_name>'
```

- You can see the API running at 127.0.0.1:8004

### API Docs

Currently following APIs are supported

1. Search

- {{URL}}/v1/api/scrape/search/text?text=virat
- after text= provide the key word you want to search for

2. Get All Stored Data in a paginated form

- {{URL}}/v1/api/scrape/get/storedResults
- It takes the following params
  - page : pageNumber
  - limit : no of results per page
  - sort : sort by title, publishedDate

To get more details import the following collection
Postman Collection Link

- https://www.getpostman.com/collections/8661968a741177a51d0d
