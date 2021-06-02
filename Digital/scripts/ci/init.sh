#!/bin/bash -eu
# -e fail fast if any command fails
# -u uset variables fail

# designed for CentOS Linux
# assumed Java 8 has been installed and the bamboo agent is setup

# this script has been written to install all required dependencies for 
# building the My Account project in CI

# add google chrome repo to yum package manager
sudo tee -a /etc/yum.repos.d/google.repo > /dev/null << 'EOF'
[google-chrome]
name=google-chrome
baseurl=http://dl.google.com/linux/chrome/rpm/stable/x86_64
enabled=1
gpgcheck=1
gpgkey=https://dl.google.com/linux/linux_signing_key.pub
EOF

# install any system dependencies
sudo yum install -y gcc-c++ git google-chrome-stable xorg-x11-server-Xvfb

# install required fonts for browsers
sudo yum install -y ipa-gothic-fonts -y xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils \
    xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc

# set environment variables (only needed first time)
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# install NVM if does not exists
nvm version || curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# install a stable version of node (required to source nvm.sh in build script)
nvm install stable

# set the default to the stable version
nvm alias default stable

# ensure build agent build directories are cleaned up (deletes anything older than 7 days based on local machine time)
echo 'find /home/bamboo/bamboo-agent-home/xml-data/build-dir/ -depth -not -path *repositories-cache* -not -path *repositoryData* -atime +7 -delete' > /home/bamboo/bamboo-clean.sh

# make it executable for cron tasks
chmod u+x /home/bamboo/bamboo-clean.sh

# schedule task in cron to run once a day, at 5am (local machine time)
crontab -l 2>/dev/null | grep -q '/home/bamboo/bamboo-clean.sh' || echo "0 5 * * * /home/bamboo/bamboo-clean.sh" | crontab -

# configure swap space (check with sudo swapon -s)
sudo dd if=/dev/zero of=/swapfile bs=1G count=8

sudo chmod 600 /swapfile

sudo mkswap /swapfile

sudo swapon /swapfile

sudo bash -c "echo '/swapfile none swap sw 0 0' >> /etc/fstab"

sudo bash -c "echo 'vm.swappiness=30' >> /etc/sysctl.conf"

sudo swapon -s

# verify swap is on
free -m
cat /proc/meminfo | grep -i swap


# override default /usr/bin/xvfb-run (caused build failures)
sudo sed -i '/kill $XVFBPID/c\if [[ $(ps -p $XVFBPID > /dev/null) == 0 ]]; then\n    echo "Killing Xvfb process $XVFBPID..."\n    kill $XVFBPID\nfi' /usr/bin/xvfb-run