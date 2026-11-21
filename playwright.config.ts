{
  "name": "bitdeer-clone-test",
  "testDir": ".",
  "projects": [
    {
      "name": "chromium",
      "use": {
        "browserName": "chromium"
      }
    }
  ],
  "fullyParallel": true,
  "timeout": 30000,
  "expect": {
    "timeout": 5000
  },
  "reporter": "list",
  "retries": 0,
  "workers": 4,
  "outputDir": "test-results"
}
