# testcafe-reporter-xray-jira
[![Build Status](https://travis-ci.org/Vooha-QualiTlabs/testcafe-reporter-xray-jira.svg)](https://travis-ci.org/Vooha-QualiTlabs/testcafe-reporter-xray-jira)

This is the **xray-jira** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Install

```
npm install testcafe-reporter-xray-jira
```
## Define env variables

JIRA_BASE_URL= https://xxxx.atlassian.net/ 
JIRA_AUTH = Basic xxxxxxxxxxxxx
JIRA_PROJECT_KEY= YOUR_JIRA_PROJECT_KEY
XRAY_CLIENT_ID = YOU_CAN_GET_IT_FROM_XRAY_API_KEYS
XRAY_CLIENT_SECRET = YOU_CAN_GET_IT_FROM_XRAY_API_KEYS


## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter xray-jira
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('xray-jira') // <-
    .run();
```

## Author
VoohaN 
