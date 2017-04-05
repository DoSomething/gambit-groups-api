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

If no group already exists for the given Campaign & Campaign Run, it will create a new Messaging Group & Mobile Commons Groups for each environment (`'production'`, `'thor'`, and `'local'`).

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

Retrieves the Messaging Group for the given Campaign ID & Campaign Run ID.

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