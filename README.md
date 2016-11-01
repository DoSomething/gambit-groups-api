## Gambit Groups API
Micro service which handles group generation & provides ID's to messaging services.

## Setup
`npm install`

`cat .env.example >> .env`

`heroku local`

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
