File Purpose
To document data modifications to existing mocks that will be required once the dynamic mock can be set up


Jira ticket
DSP-29259 (Diamond)
Bill Smoothing ineligibility showing as Overdue when there is an existing payment extension in place


Alter users\AGL_0000C99D68E21ED4B38A573027E717E8\aglBillSmoothingApi\v1\contractAccounts\55920961\billsmoothing\estimates\response.json
needs to have ****
    "body": {
        "contractAccountNumber": 55920961,
        "estimates": [
            {
                "contractNumber": 9035268363,
                "error": { ****
                    "message": "dummy message",
                    "internalError": {
                        "errorId": "ZIFI511",
                        "errorNumber": "04",
                        "description": "dummy description"
                    }
                }
            }
        ]
    }


Alter users\AGL_0000C99D68E21ED4B38A573027E717E8\aglWebApi\api\v1\payments\response.json
needs to have ****

"body": [
        {
            "account": "55920961",
            "contract": "9035268363",
            "overdue": 0,
            "dueDate": "26/05/2017",
            "currentBalance": 78.48,
            "totalPayment": 0,
            "billSmoothing": false,
            "directDebit": false,
            "extendedDueDate": "26/06/2017" ****
        },

It will also need instalment plan data completed in DSP-24498 (Diamond) Yet to be completed
