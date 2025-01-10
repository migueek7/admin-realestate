FROM php:8.1-apache

RUN chown -R www-data:www-data /var/www/html

RUN a2enmod rewrite headers
RUN apt-get update 
RUN apt-get install -y gcc
RUN apt-get install -y curl

RUN docker-php-ext-install pdo_mysql 


COPY app/ /var/www/html/
COPY 000-default.conf /etc/apache2/sites-available/000-default.conf

EXPOSE 80 5501