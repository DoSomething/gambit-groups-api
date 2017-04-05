# Messaging Groups API

The Messaging Groups API (MGAPI) is an internal DoSomething microservice to handle Messaging Group generation & expose their ID's. It creates 2 Groups (Doing and Completed) in Mobile Commons for any given Campaign Run, which we then use to segment our broadcasts per members' activity.

MGAPI is built using [Express](http://expressjs.com/) and [MongoDB](https://www.mongodb.com).

## Getting Started

Install Node, MongoDB, and the Heroku toolbelt. 

Next, fork and clone this repository. To run MGAPI locally:
* `sudo mongod`
* `heroku local` from your local `messaging-groups-api` directory


### Docker

MGAPI can also be installed via Docker:

1. `git clone`
2. `docker-compose up`

All apps are executed by `Foreman` to handle process management & mimic Heroku.
`Nodemon` will autoreload the server when a file changes.
The compose file defines env variables for connection details & network mapping.


## License
&copy;2017 DoSomething.org. Messaging Groups API is free software, and may be redistributed under the terms specified in the [LICENSE](https://github.com/DoSomething/messaging-groups-api/blob/develop/LICENSE) file. The name and logo for DoSomething.org are trademarks of Do Something, Inc and may not be used without permission.
