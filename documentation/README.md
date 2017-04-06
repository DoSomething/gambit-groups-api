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
