# __Routes For User Profiles__

## Lender Dashboard 
---
* **[Find User's Hidden Details](..\controller\userController.js)** - Basically gives the hidden details about a user<br><br>
    - __GET__ : &nbsp; `{{URL}}/api/user/6076cfa408541e2ba057e335`

        - ```x
            {
                "data": {
                    "usertype": "Receiver",
                    "_id": "6076cfa408541e2ba057e335",
                    "username": "Shoummo",
                    "password": "$2a$10$kWGdqy62nFIV07gtUxcIO.yvOGaIYEFzLG6fqOlZJS1btF1wLvBuq",
                    "email": "shoummo66@gmail.com",
                    "nid": "$2a$10$.lH2qDsusb2oZWiD4pjhWOAsQ6PFdYRQhV4s5PRGstiNDokd.1XjK",
                    "bkash": "01961145455",
                    "dob": "1997-01-10T00:00:00.000Z",
                    "__v": 0
                },
                "status": "OK",
                "message": "User found in the database"
            }
---

* **[Show User's Site History](..\controller\userController.js)** - Shows Currently lending section & Site history section <br><br>
    - __GET__ : &nbsp; `{{URL}}/api/user/6076cfa408541e2ba057e335/history`

        - ```x
            {
                "data": {
                    "completedContractCount": 0,
                    "maxAmountLent": 200,
                    "nextInstallmentDate": "2021-08-03T12:10:27.786Z",
                    "nextInstallmentAmount": 66.66666666666667,
                    "currentlyActiveContacts": [
                        {
                            "contractId": "60a2288f788f921b543cd811",
                            "amount": 200,
                            "collectedAmount": 0,
                            "nextInstallmentAmount": 66.66666666666667,
                            "nextInstallmentDate": "2021-08-03T12:10:27.786Z",
                            "interestRate": 5,
                            "contractDefaults": 0,
                            "installmentsCompleted": 0
                        },
                        
                        {
                            "contractId": "60a2288f788f921b543cd811",
                            "amount": 200,
                            "collectedAmount": 0,
                            "nextInstallmentAmount": 66.66666666666667,
                            "nextInstallmentDate": "2021-08-03T12:10:27.786Z",
                            "interestRate": 5,
                            "contractDefaults": 0,
                            "installmentsCompleted": 0
                        }
                    ]
                },
                "status": "OK",
                "message": "User history of contracts has been found."
            }

    - __PUT__ :&nbsp; `{{URL}}/api/contract`
    

        - ```x
            req.body  

            {
                "contractId": "60a2288f788f921b543cd812",
                "issuerId": "6076cfa408541e2ba057e336"
            }
        - returns nothing important <br><br>
    - __POST__ : &nbsp; `{{URL}}/api/report`
        - not yet implemented
    
