# Crypto Bot

Notification app that notify you by email when a crypto currency reach a certain value

## Requirements

- Python 3.6.3
- Django 1.11.7
- Django Rest Framework 3.7.3
- Djoser 1.1.4
- Redis 2.10.6 
- Celery 4.1.0
- Coinbase 2.0.6
- MysqlClient 1.3.12

## Configuration

### Database

The project is running on mysql, feel free to change it if you prefer

- DB_NAME : database name
- DB_USER : database user
- DB_PASSWORD : database password
- DB_HOST : database adress
- DB_TEST_NAME : database name use for tests

### Secret key

- SECRET_KEY - a random secret key

### Coinbase API

Please create an account and create an api key on [coinbase](http://coinbase.com/)

- COINBASE_API_KEY - your api key
- COINBASE_API_SECRET - your api secret

### Celery

In order for Celery to work please choose a broker, for this project I use Redis

- CELERY_BROKER_URL - The broker url
- CELERY_RESULT_BACKEND - Again the broker url

### Mail

The app sends mail... so you need to setup one
Here I'll list the Gmail's default

- EMAIL_HOST - smtp.gmail.com
- EMAIL_HOST_USER - example@gmail.com
- EMAIL_HOST_PASSWORD - SuperMotDePas$e

## How to install

In the project folder
```
pip install -r requirements.txt
./manage.py migrate
```

## Instance running in test
```
./manage.py runserver

celery -A crypto_bot worker -l info

celery -A crypto_bot beat -l info

redis-server
```

## Improvements - AKA TODO

### The bot - schedule task

For now I make a fetch the filters from databse each time the task is executed.
To optimize it we need to put the filters in redis or in cache and them test them from there. One problem we also need to add the new alerts in it while the scheduled task is running ( Signals / Tasks )

### API clarity

For the users and auth I use Djoser which provide the common functions we always need. Though it creates a Root endpoint at /api that doesn't reflect all the api. Also I need to create Root endpoint for the sub endpoints

### Security

I use the Token auth in order to authentify users. This create a permanent effect 'remember me' unless we delete the tokens. It might be better to setup the json web token and assign a reasonable expire time.

### Versionning

There is no versionning for the api, a major problem if we begin to use in production because it will be more painfull to add modifications or rewrite some things whithout causing the apps that depend on it to stop working

### The front

Well... it's not done yet

