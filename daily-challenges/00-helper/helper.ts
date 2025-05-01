interface ITestCase {
    input: any;
    expectedOutput: any;
}

//Common function to test a specific function with the testcases
export function testFunction(functionName: (input: any) => any, testCases: ITestCase[]) {
    let isAllPassed = true;
    testCases.forEach(testCase => {
        const actualOutput = functionName(testCase.input);

        if (actualOutput !== testCase.expectedOutput) {
            isAllPassed = false;
            console.log(`Test Input     : ${testCase.input}`);
            console.log(`Actual Output  : ${actualOutput}`);
            console.log(`Expected Output: ${testCase.expectedOutput}`);
            console.log("Test Failed");
            console.log("----------------");
        }
    })

    if (isAllPassed) {
        console.table({Status: "All tests passed!"});
    }

}