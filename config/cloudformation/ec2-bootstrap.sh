#!/bin/bash

yum update -y
curl --silent --location https://rpm.nodesource.com/setup_8.x | bash -
yum -y install nodejs git jq
npm install -g nodemon

export HOME_DIR=/opt/node

groupadd node
useradd node -g node -m -d $HOME_DIR

curl -w "\n" http://169.254.169.254/latest/meta-data/placement/availability-zone > /etc/az 2>/dev/null
cat /etc/az | (read h; echo ${h:0:-1}) > /etc/region
curl -w "\n" -H "Accept: application/json" http://169.254.169.254/latest/meta-data/instance-id > /etc/instance_id 2>/dev/null
aws ec2 describe-instances --region $(cat /etc/region) --filter Name=instance-id,Values=$(cat /etc/instance_id) > /etc/instance_details 2>/dev/null
jq '.Reservations[0].Instances[0].Tags[] | select(.Key=="Port")'.Value /etc/instance_details | awk -F "\"" '{print $2}' > /etc/node_port
jq '.Reservations[0].Instances[0].Tags[] | select(.Key=="NodeModule")'.Value /etc/instance_details | awk -F "\"" '{print $2}' > /etc/node_module

export NODE_MODULE=$(cat /etc/node_module)
export NEXUS_SERVER=http://nexus.alphaea.uk
export NPM_REPO_NAME=npm-releases
export NODE_ENV=

cd ${HOME_DIR}
sudo -E -u node npm config set @alphaeadev:registry ${NEXUS_SERVER}/repository/${NPM_REPO_NAME}/
sudo -E -u node git clone https://github.com/alphaeadevelopment/${NODE_MODULE}.git
cd ${NODE_MODULE}
sudo -E -u node npm install
sudo -E -u node npm run use:stubs
sudo -E -u node npm run build

aws s3 cp s3://alphaea-uk-scripts/node.init.d /etc/init.d/node
chmod 750 /etc/init.d/node

service node start
chkconfig node on
