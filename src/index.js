var xray = require( '../test/utils/xray');

let executionId;

module.exports = function () {  
               
    return {
        async reportTaskStart (startTime, userAgents, testCount) {
            this.startTime = startTime;
            this.testCount = testCount;
    
            const date = startTime.toString().split(' ');
            const browser = userAgents[0].split(' ')[0];
            const os = userAgents[0].split('/')[1];
            var osType;

            if (os.includes('mac')) 
                osType = 'Mac';            
            
            else if (os.includes('Windows')) 
                osType = 'Windows';
              
            const env = `${osType} ${browser}`;
      
            executionId = await xray.createTestExecution(env, date);      
        },
    
        async reportFixtureStart (name, path, meta) {
            this.currentFixtureName = name;
        },
    
        async reportTestDone (name, testRunInfo, meta) {
            const errors      = testRunInfo.errs;      
            const hasErrors   = !!errors.length;    
            const result      = hasErrors ? 'failed' : 'passed';        
            
            // Get JIRA issue Id for the Test
            const testKey = name.split(' ')[0];        
            const testIssueId = await xray.getIssueId(testKey);
    
            // Get Test Run Id for the Test in Test Execution
            var getTestRunData = await xray.getTestRun(testIssueId, executionId);
            var testRunId;

            if (getTestRunData.data.getTestRun != null) 
                testRunId = getTestRunData.data.getTestRun.id;
            else {
                await xray.addTestToTestExecution(testIssueId, executionId);
                getTestRunData = await xray.getTestRun(testIssueId, executionId);
                testRunId = getTestRunData.data.getTestRun.id;
            }
    
            // Get Test Execution result
            var testRunStatus = ''; 

            if (result == 'failed') 
                testRunStatus = 'FAILED';
            else if (testRunInfo.skipped) 
                testRunStatus = 'SKIPPED';
            else 
                testRunStatus = 'PASSED';
              
    
            // Update the Test Run
            await xray.updateTestRunStatus(testRunId, testRunStatus);
              
            // Get Error message if failed
            var testRunError = '';

            if (testRunStatus == 'FAILED') {                      
                testRunInfo.errs.forEach(function (error) {          
                    testRunError += this.formatError(error);
                });          
                console.log('testRunError: ', testRunError);        
            }
    
            // Add comment if the Test is failed
            if (testRunStatus == 'FAILED') {
                await xray.addCommentToTestRun(testRunId, testRunError);
                
                // Add Evidence Screenshots to Test Run
                for (let i = 1; i <= testRunInfo.screenshots.length; i++) 
                    await xray.addEvidenceToTestRun(testRunId, testRunInfo.screenshots[i - 1].screenshotPath, i);
                 
            }  
            
        },
    
        async reportTaskDone (/*endTime, passed, warnings, result*/) {
            
        }
    
    };
};


