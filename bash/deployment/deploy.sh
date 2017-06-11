#!/usr/bin/env bash

npm pack ../../
scp movuex-0.1.0.tgz root@$1:~
scp -r config root@$1:~
scp provision.sh root@$1:~
ssh root@$1 "./provision.sh"