FROM php:7.4-fpm

RUN cd && mkdir code

RUN apt-get update

RUN apt-get upgrade

RUN echo 'y' | apt-get install zip

RUN echo 'y' | apt-get install git

RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

RUN php composer-setup.php

RUN php -r "unlink('composer-setup.php');"

RUN mv composer.phar /usr/local/bin/composer

WORKDIR /var/www/html/
