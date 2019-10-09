# aws-profile-manager
![npm](https://img.shields.io/npm/v/awsprof)
![David](https://img.shields.io/david/geoffdutton/aws-profile-manager)
[![CircleCI](https://circleci.com/gh/geoffdutton/aws-profile-manager.svg?style=svg)](https://circleci.com/gh/geoffdutton/aws-profile-manager)
[![codecov](https://codecov.io/gh/geoffdutton/aws-profile-manager/branch/master/graph/badge.svg)](https://codecov.io/gh/geoffdutton/aws-profile-manager)
[![Greenkeeper badge](https://badges.greenkeeper.io/geoffdutton/aws-profile-manager.svg)](https://greenkeeper.io/)
[![CII Best Practices](https://bestpractices.coreinfrastructure.org/projects/3201/badge)](https://bestpractices.coreinfrastructure.org/projects/3201)

Quickly and easily switch between AWS profiles

## Motivation
I wanted something similar to [nvm](https://github.com/nvm-sh/nvm) or [rvm](https://rvm.io/) to manage and set my `AWS_PROFILE` environment variouable based on the directory I'm in.

## Overview
The first proof of concept uses a centralized JSON file to keep track of what profiles to use for which directories in `.aws-profile-manager/config.json` rather than relying on some sort of dot RC file per project.

Currently, this doesn't actually export any environment variables, as I'm still trying to figure out the best way to do that. 

Important note: this profile manager doesn't modify your `~/.aws/credentials` file, and only parses the aws creds file locally to present options to the user.

## Usage
First thing, install it globally:
```bash
wget git/path/to/awsprof_install.sh
```

Then move to your project directory and save a profile:
```bash
$ cd ~/Projects/my-awesome-project
$ awsprof use
No profile set for ~/Projects/my-awesome-project
Chose a profile to use:
1)  default
2)  myStartup
```

Now you can see the export command to run when you're in that project directory:
```bash
$ cd ~/Projects/my-awesome-project
$ awsprof use
AWS_PROFILE=default
```

You can verify it exported the `AWS_PROFILE` environment variable:
```bash
$ awsprof
Current Env
AWS_PROFILE=default
```

Finally, you can reset it to be prompted again:
```bash
$ cd ~/Projects/my-awesome-project
$ awsprof reset
Removed stored profile for ~/Projects/my-awesome-project
```
