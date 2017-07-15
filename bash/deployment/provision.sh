#!/usr/bin/env bash

## Install basic development tools and nginx
apt-get update
apt-get install -y build-essential git nginx libkrb5-dev

## Install Databases
apt-get install -y mongodb redis-server

## Install Node.js 6x from NodeSource Distributions
echo "Install Nodejs 6x"
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
apt-get install -y nodejs
echo "****************"

## Copy configuration to real destinations
cp /root/config/default /etc/nginx/sites-enabled/default
cp /root/config/movuex-1.conf /etc/init
cp /root/config/movuex-2.conf /etc/init
cp /root/config/movuex-3.conf /etc/init

## Install movuex
rm -rf /opt/movuex
mkdir -p /opt/movuex
tar xvfz /root/movuex-server-0.1.0.tgz -C /opt/movuex
cd /opt/movuex/package && npm install

## Run services
service nginx restart
service movuex-1 restart
service movuex-2 restart
service movuex-3 restart