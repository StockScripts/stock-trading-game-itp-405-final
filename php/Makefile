##
 # Shuts down any existing containers, builds new containers based off of 
 # docker-compose, starts them, and then installs any necessary dependencies 
 # inside PHP container
 ##
all: down build up compinstall

##
 # ONLY CALL THIS ONCE/AT THE BEGINNING OF THE PROJECT
 # INITIALIZES A NEW LARAVEL PROJECT IN THIS DIRECTORY
 ##
init:
	docker exec -it php composer create-project laravel/laravel /var/www/temp_lara 6
	docker exec -it php cp -ar /var/www/temp_lara/. /var/www/html/
	docker exec -it php rm -rf /var/www/temp_lara/
	docker exec -it php composer install

##
 # Builds the containers
 ##
build:
	docker-compose build

##
 # Starts the containers
 ##
up:
	docker-compose up -d

##
 # Shuts down the containers
 ##
down:
	docker-compose down

##
 # Allows user to access bash shell of PHP container
 ##
bash:
	docker exec -it php /bin/bash

##
 # Executes composer install inside PHP container
 ##
compinstall:
	docker exec -it php composer install

