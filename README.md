# Youtube Search

- This is an application that runs a cron job to cache a search querry from youtube.
- Provides search, paginated response fucntionality
- Provides an option to add unlimited youtube API credentials, on expiry a new one is taken for the next cron job

Postman Collection Link

- https://www.getpostman.com/collections/8661968a741177a51d0d

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
