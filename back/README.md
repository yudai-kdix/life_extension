# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...


多分これで起動するはずです………
```
docker compose run --no-deps web rails new . --force --api --database=postgresql
docker compose build
docker compose run web rake db:create
docker compose up
```