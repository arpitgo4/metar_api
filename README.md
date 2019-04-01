

# Metar API
Metar API with redis cache for fast and reliable metar weather data.

## Project Structure

```
        .
        ├── api-gateway                 #  Nginx Api Gateway
        ├── deployment
        |   ├── development             #  Docker-compose development config
        |   └── production              #  Docker-compose production config
        ├── server                      #  Api Server
        └── README.md                   #  This file
```

## Postman API Sheet
```
## Postman api collection
https://documenter.getpostman.com/view/401954/S17wP6VP
```

## Environment Variables
```
## Environment variables are defined in the deployment/[production/development]/docker-compose.yml
## Environment variables are needed for successfull startup of the server

SERVER_PORT=8080                        # Port number for server to listen
REDIS_HOST=redis_cluster_ip:6379        # Redis connection url
NODE_ENV=production                     # Server environment to run
REDIS_METAR_EXPIRY=5                    # Redis expiration time for metar info
API_GATEWAY=api_gateway                 # Api gateway service domain name
```


## Development
```
# Start project in development mode with hot code loading,
cd deployment/development && docker-compose up --build [-d]

# See logs for a container (service in docker-compose)
cd deployemnt/development && docker-compose logs --follow <service_name>

# Get container (service) shell access
cd deployment/development && docker-compose exec <service_name> sh

# Enjoy developing :)
```

## Production
```
# Start project in production mode,
cd deployment/production && docker-compose up --build


# Open web browser at http://localhost/api/v1/ping
# You will see a response : { data: 'pong' }
```

## Feedback
In case of any query or feedback, please feel free to connect via
* arpit.go4@gmail.com (Arpit Goyal)

Or, open an issue at github.