# testcafe-reporter-xray-jira
[![Build Status](https://travis-ci.org/Vooha-QualiTlabs/testcafe-reporter-xray-jira.svg)](https://travis-ci.org/Vooha-QualiTlabs/testcafe-reporter-xray-jira)

This is the **xray-jira** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/Vooha-QualiTlabs/testcafe-reporter-xray-jira/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-xray-jira
```

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
