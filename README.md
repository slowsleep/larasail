# My awesome project

This is a laravel application with mysql and adminer which were installed via laravel sail.

## How to start the project
Laravel sail is create the docker container, so first you need to install `docker`
And laravel is use `composer` for install all packages for project

If you have docker and composer, you can start next lines

So, first you need

`composer install`

Next, copy .env.example to .env and edit lines for your project

and then start the command

`./vendor/bin/sail up`

Create all tables

`sail php artisan migrate`

Generate key

`sail php artisan key:generate`

Build front

`sail npm run build`

Install reverb and generate push id
`php artisan reverb:install`

Start reverb

`sail php artisan reverb:start --host="0.0.0.0" --port=8080`

Laravel app will launch at http://localhost:80 , http://0.0.0.0:80
And adminer: http://localhost:8081 , http://0.0.0.0:8081
