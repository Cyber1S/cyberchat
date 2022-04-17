#!/usr/bin/env bash

# Description: Cyber1SChat installation script
# OS: Ubuntu 20.04 LTS / Ubuntu 20.10
# Script Version: 0.8
# Run this script as root

read -p 'Would you like to configure a domain and SSL for Cyber1SChat?(yes or no): ' configure_webserver

if [ $configure_webserver == "yes" ]
then
read -p 'Enter your sub-domain to be used for Cyber1SChat (Cyber1SChat.domain.com for example) : ' domain_name
echo -e "\nThis script will try to generate SSL certificates via LetsEncrypt and serve cyber1schat at
"https://$domain_name". Proceed further once you have pointed your DNS to the IP of the instance.\n"
read -p 'Enter the email LetsEncrypt can use to send reminders when your SSL certificate is up for renewal: ' le_email
read -p 'Do you wish to proceed? (yes or no): ' exit_true
if [ $exit_true == "no" ]
then
exit 1
fi
fi

read -p 'Would you like to install postgres and redis?(Answer no if you plan to use external services): ' install_pg_redis

if [ $install_pg_redis == "no" ]
then
echo "***** Skipping pg and redis installation. ****"
fi

apt update && apt upgrade -y
apt install -y curl
curl -sL https://deb.nodesource.com/setup_12.x | bash -
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
apt update

apt install -y \
    git software-properties-common imagemagick libpq-dev \
    libxml2-dev libxslt1-dev file g++ gcc autoconf build-essential \
    libssl-dev libyaml-dev libreadline-dev gnupg2 \
    postgresql-client redis-tools \
    nodejs yarn patch ruby-dev zlib1g-dev liblzma-dev \
    libgmp-dev libncurses5-dev libffi-dev libgdbm6 libgdbm-dev sudo

if [ $install_pg_redis != "no" ]
then
apt install -y postgresql postgresql-contrib redis-server
fi

if [ $configure_webserver == "yes" ]
then
apt install -y nginx nginx-full certbot python3-certbot-nginx
fi

adduser --disabled-login --gecos "" cyber1schat

gpg --keyserver hkp://keyserver.ubuntu.com --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
gpg2 --keyserver hkp://keyserver.ubuntu.com --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB
curl -sSL https://get.rvm.io | bash -s stable
adduser cyber1schat rvm

if [ $install_pg_redis != "no" ]
then
pg_pass=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 15 ; echo '')
sudo -i -u postgres psql << EOF
\set pass `echo $pg_pass`
CREATE USER cyber1schat CREATEDB;
ALTER USER cyber1schat PASSWORD :'pass';
ALTER ROLE cyber1schat SUPERUSER;
UPDATE pg_database SET datistemplate = FALSE WHERE datname = 'template1';
DROP DATABASE template1;
CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UNICODE';
UPDATE pg_database SET datistemplate = TRUE WHERE datname = 'template1';
\c template1
VACUUM FREEZE;
EOF

systemctl enable redis-server.service
systemctl enable postgresql
fi

secret=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 63 ; echo '')
RAILS_ENV=production

sudo -i -u cyber1schat << EOF
rvm --version
rvm autolibs disable
rvm install "ruby-3.0.2"
rvm use 3.0.2 --default

git clone https://github.com/cyber1s/cyber1schat.git
cd cyber1schat
if [[ -z "$1" ]]; then
git checkout master;
else
git checkout $1;
fi
bundle
yarn

cp .env.example .env
sed -i -e "/SECRET_KEY_BASE/ s/=.*/=$secret/" .env
sed -i -e '/REDIS_URL/ s/=.*/=redis:\/\/localhost:6379/' .env
sed -i -e '/POSTGRES_HOST/ s/=.*/=localhost/' .env
sed -i -e '/POSTGRES_USERNAME/ s/=.*/=cyber1schat/' .env
sed -i -e "/POSTGRES_PASSWORD/ s/=.*/=$pg_pass/" .env
sed -i -e '/RAILS_ENV/ s/=.*/=$RAILS_ENV/' .env
echo -en "\nINSTALLATION_ENV=linux_script" >> ".env"

rake assets:precompile RAILS_ENV=production
EOF

if [ $install_pg_redis != "no" ]
then
sudo -i -u cyber1schat << EOF
cd cyber1schat
RAILS_ENV=production bundle exec rake db:create
RAILS_ENV=production bundle exec rake db:reset
EOF
fi

cp /home/cyber1schat/cyber1schat/deployment/cyber1schat-web.1.service /etc/systemd/system/cyber1schat-web.1.service
cp /home/cyber1schat/cyber1schat/deployment/cyber1schat-worker.1.service /etc/systemd/system/cyber1schat-worker.1.service
cp /home/cyber1schat/cyber1schat/deployment/cyber1schat.target /etc/systemd/system/cyber1schat.target

systemctl enable cyber1schat.target
systemctl start cyber1schat.target

public_ip=$(curl http://checkip.amazonaws.com -s)

if [ $configure_webserver != "yes" ]
then
echo -en "\n\n***************************************************************************\n"
echo "Wooh! Wooh!! Cyber1SChat server installation is complete"
echo "The server will be accessible at http://$public_ip:3000"
echo "To configure a domain and SSL certificate, follow the guide at https://chat.cyber1s.com/docs/deployment/deploy-cyber1schat-in-linux-vm"
echo "***************************************************************************"
else
curl https://ssl-config.mozilla.org/ffdhe4096.txt >> /etc/ssl/dhparam
wget https://raw.githubusercontent.com/Cyber1S/Cyber1sChat/develop/deployment/nginx_cyber1schat.conf
cp nginx_cyber1schat.conf /etc/nginx/sites-available/nginx_cyber1schat.conf
certbot certonly --non-interactive --agree-tos --nginx -m $le_email -d $domain_name
sed -i "s/Cyber1SChat.domain.com/$domain_name/g" /etc/nginx/sites-available/nginx_cyber1schat.conf
ln -s /etc/nginx/sites-available/nginx_cyber1schat.conf /etc/nginx/sites-enabled/nginx_cyber1schat.conf
systemctl restart nginx
sudo -i -u cyber1schat << EOF
cd cyber1schat
sed -i "s/http:\/\/0.0.0.0:3000/https:\/\/$domain_name/g" .env
EOF
systemctl restart cyber1schat.target
echo -en "\n\n***************************************************************************\n"
echo "Wooh! Wooh!! Cyber1SChat server installation is complete"
echo "The server will be accessible at https://$domain_name"
echo "***************************************************************************"
fi


if [ $install_pg_redis == "no" ]
then
echo -en "\n\n***************************************************************************\n"
echo "DB migrations are not run as pg and redis is not installed."
echo "After modifying .env with your external db creds, run db migrations !!!"
echo "***************************************************************************"
fi
