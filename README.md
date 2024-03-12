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

Laravel app will launch at http://localhost:80 , http://0.0.0.0:80
And adminer: http://localhost:8080 , http://0.0.0.0:8080
