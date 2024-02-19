module.exports = {
	// Display detailed info about each test
	//verbose: true,
	reporters: [
		"default",
		[
			"jest-html-reporter",
			{
				pageTitle: "Jest Test Report",
				outputPath: "./test-report.html",
				includeFailureMsg: true,
			},
		],
	],
};
