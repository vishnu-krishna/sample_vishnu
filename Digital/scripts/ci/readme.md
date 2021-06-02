### CI
For setting up new VMs please read:
`https://aglenergy.atlassian.net/wiki/display/DOPS/Configuring+New+Linux+Remote+Agents`
Notes: Uses OS Hardened CentOS 7.3, recommended VM size: DS2_V2 PROMO

#### Bamboo
See [Bamboo](https://agl-bamboo.digital.agl.com.au/browse/AGAPPS)

#### Tasks
`init.sh`: Use to initially provision a build agent with only the bamboo agent installed.
`nvm.sh`: Used by `build.sh` and `smoke.sh` to bootstrap and initialise NVM.
`backstop.sh`: Confirms the tested My Account CSS components match the reference expectations.
`build.sh`: Use in Bamboo build task to run the CI tasks for My Account builds.
`smoke.sh`: Runs the smoke test with a bamboo linux build agent, this runs with XVFB with a dynamic display port.
`smoke-local.sh`: Runs the smoke test with a bamboo linux build agent, this runs with XVFB with a dynamic display port using the AOT build and AOT web server and local mockserver.
`e2e.sh`: Runs the e2e browser tests using the AOT build to run the AOT web server and local mockserver.
`local-server-stop.sh`: Script to ensure AOT web server and local mockserver are stopped.

## Ports and access
### Octopus Server
1.  In Network Security Groups on Octopus Server (in Azure)
    Must allow https (443) from new source IP

### Bamboo build agent
1.  In Network Security Groups on Bamboo Build Server (in Azure)
1.  Allow broker access on port 54663
1.  Allow https (443) access inbound
1.  Ensure Security Team has configured Crowdstrike (or any other security programs) to run as `bamboo` so it does not change file permissions on the server.

#### Bamboo Service
* To check status: `sudo service bamboo-agent status`