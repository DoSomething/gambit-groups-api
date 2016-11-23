## Gambit Groups API
Micro service which handles group generation & provides ID's to messaging services.

# Setup
## Entire Gambit System w/ Docker
All Gambit services & required dependencies can be setup locally with docker compose. See the [gambit-services](https://github.com/DoSomething/gambit-services) repo.

## Standalone w/ Docker
In order to setup this app & required dependencies, simply

1. `git clone`
2. `docker-compose up`

### Docker setup under the hood
All apps are executed by `Foreman` to handle process management & mimic Heroku.
`Nodemon` will autoreload the server when a file changes.
The compose file defines env variables for connection details & network mapping.

## Standalone without Docker
1. Run an instance of RabbitMQ, MongoDB. Two options,
  * Install these tools locally & run them
  * Run the docker container with just backend tooling configured.
2. Edit .env with correct service URI's, most likely in for the form of service://localhost:<port>
3. `npm start` (requires Foreman from the Heroku Toolbelt)

## API
All API requests require the `x-messaging-group-api-key` to be set in the headers.

#### Create a group
**POST** `/api/v1/group`
```
{
	"campaign_id": "1112",
	"campaign_run_id": "23343212"
}
```

If no group already exists for that campaign & campaign run, it will create a new group & mobile commons groups for each environment.
It will then return the id's in the response.

```
{
  "campaign_id": 1243245,
  "campaign_run_id": 1243242423,
  "_id": "58136e604545e6189d103b37",
  "mobilecommons_groups": {
    "production": {
      "completed": 257533,
      "doing": 257530
    },
    "thor": {
      "completed": 257527,
      "doing": 257524
    },
    "local": {
      "completed": 257521,
      "doing": 257518
    }
  }
}
```

#### Get a group
**GET** `/api/v1/group/:campaign_id/:campaign_run_id`

Retrieves the group for the given campaign ID & campaign run ID.

```
{
  "campaign_id": 1243245,
  "campaign_run_id": 1243242423,
  "_id": "58136e604545e6189d103b37",
  "mobilecommons_groups": {
    "production": {
      "completed": 257533,
      "doing": 257530
    },
    "thor": {
      "completed": 257527,
      "doing": 257524
    },
    "local": {
      "completed": 257521,
      "doing": 257518
    }
  }
}
```
