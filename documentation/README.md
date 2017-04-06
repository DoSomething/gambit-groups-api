# API

All API requests require the `x-messaging-group-api-key` to be set in the headers.

## Get Mobile Commons Groups

Finds or creates the "Doing" and "Completed" Mobile Commons Groups that correspond to the Campaign, Campaign Run, and Environment query parameters passed.

The response `data` has contains `doing` and `completed` properties set to the corresponding Mobile Commons Groups. Unfortunately, this endpoint can't be tested without creating live Groups on Mobile Commons, so please use caution!

```
GET /api/v1/mobilecommons-groups
```

### Required query parameters:

* `campaign_id` -- The DoSomething Campaign ID
* `campaign_run_id` -- The Campaign Run ID of the Doing/Completed activity
* `environment` -- The server environment requesting the Groups. Expected values: `'thor'` | `'production'`


#### Example Request
```
curl "http://localhost:5100/api/v1/mobilecommons-groups?campaign_id=123&campaign_run_id=456&environment=thor" \
     -H "x-messaging-group-api-key: totallysecret"
```

#### Example Response
```
{
  "data": {
    "doing": {
      "id": 296486,
      "name": "campaign_id=123 run_id=456 field=doing env=thor",
      "status": "active",
      "size": 0
    },
    "completed": {
      "id": 296492,
      "name": "campaign_id=123 run_id=456 field=completed env=thor",
      "status": "active",
      "size": 0
    }
  }
}
```

## To be deprecated

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