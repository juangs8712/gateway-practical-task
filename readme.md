 # Gateway install guide. 
 * This app was made using NodeJS v18.13.0 and MongoDB

* ### First install node packages
    ```
        npm install
        npm install -g typescript
    ```
* ### Transpile TypeScript code to JavaScript 
    `tsc`
    * The output files will be in ./dist/ directory

* ### Execute the server
    * Run one of the following commands
    ` node dist/app.js ` or ` npm start `

* ## The app is unfolded in the next [link](https://gateway-practical-task.onrender.com/#/)
    * Click this link to open the [back-end repository](https://github.com/juangs8712/gateway-practical-task)
    * Click this link to open the [front-end repository](https://github.com/juangs8712/gateway-practical-task-front)
    * The Basic UI is unfolded with the back-end in the directory /public.
    * The UI was made on Flutter cause I don't know React or Angular, yet.
    These are the next framework I want learn.


* ## API guide
* ### The Postman Guide.
    * The API documentation is published by Postman in this [link](https://documenter.getpostman.com/view/20396295/2s93eeSAKA)
    * There is a copy of the guide in the root directory.

* ### Gateway
    * #### Get gateway list
    1. URL: {{url}}/api/gateway?skip=0&limit=10
    2. Request method: GET
    3. Input body: Empty
    4. Output body:
        ```{
        "total": 12,
        "gateways": [
                {
                    "_id": "645fad3a93aa2815004bb74b",
                    "name": "Gateway 1",
                    "ipv4": "192.169.1.1",
                    "state": true
                },
                {
                    "_id": "645fad6f93aa2815004bb750",
                    "name": "Gateway 2",
                    "ipv4": "192.169.1.2",
                    "state": true
                }...
            ]
        }
        ```
    ---
    * #### Get gateway by ID
    1. URL: {{url}}/api/gateway/645fad3a93aa2815004bb74b
    2. Request method: GET
    3. Input body: Empty
    4. Output body
        ```{
            "gateway": {
                "_id": "645fad3a93aa2815004bb74b",
                "name": "Gateway 1",
                "ipv4": "192.169.1.1",
                "state": true
            }
        }
        ```
    ---
    * #### Insert a gateway
    1. URL: {{url}}/api/gateway
    2. Request method: POST
    3. Input body:
        ``` {
            "name": "Gateway 13",
            "ipv4": "192.169.1.12"
        }  
        ```
    4. Output body
    ``` {
            "gateway": {
                "_id": "6462b56e965cc362541d0be3",
                "name": "Gateway 13",
                "ipv4": "192.169.1.13",
                "state": true
            }
        }
    ```
    ---
    * #### Update a gateway
    1. URL: {{url}}/api/gateway/6462b56e965cc362541d0be3
    2. Request method: PUT
    3. Input body:
        ``` {
            "name" : "Name Gateway 13 Updated",
            "ipv4" : "192.169.1.1"
        } 
        ```
    4. Output body
    ``` {
            "gateway": {
                "_id": "6462b56e965cc362541d0be3",
                "name": "Name gateway 13 updated",
                "ipv4": "192.169.1.1",
                "state": true
            }
        }
    ```
    ---
    * #### Delete a gateway
    1. URL: {{url}}/api/gateway/6462b56e965cc362541d0be3
    2. Request method: DELETE
    3. Input body:  Empty
    4. Output body
    ``` {
            "gateway": {
                "_id": "6462b56e965cc362541d0be3",
                "name": "Name gateway 13 updated",
                "ipv4": "192.169.1.1",
                "state": false
            }
        }
    ```

* ### Peripheral
    * #### Get peripheral list
    1. URL: {{url}}/api/peripheral?skip=0&limit=10
    2. Request method: GET
    3. Input body: Empty
    4. Output body:
        ```{
            "total": 26,
            "peripherals": [
                {
                    "_id": "645fcf4e6480f10530c5747a",
                    "uid": 1,
                    "vendor": "Vendor name 2",
                    "gateway": {
                        "_id": "645fad6f93aa2815004bb750",
                        "name": "Gateway 2"
                    },
                    "status": "online",
                    "state": true,
                    "date": "2023-05-13T17:56:30.944Z"
                },
                {
                    "_id": "645fd25268eb2da74c106ae7",
                    "uid": 2,
                    "vendor": "Vendor name 1",
                    "gateway": {
                        "_id": "645fad3a93aa2815004bb74b",
                        "name": "Gateway 1"
                    },
                    "status": "online",
                    "state": true,
                    "date": "2023-05-13T18:09:22.418Z"
                },...
            ]
        }
        ```
    ---
    * #### Get a peripheral by ID
    1. URL: {{url}}/api/peripheral/645fcf4e6480f10530c5747a
    2. Request method: GET
    3. Input body: Empty
    4. Output body
    ``` {
            "peripheral": {
                "_id": "645fcf4e6480f10530c5747a",
                "uid": 1,
                "vendor": "Vendor name 2",
                "gateway": {
                    "_id": "645fad6f93aa2815004bb750",
                    "name": "Gateway 2"
                },
                "status": "online",
                "state": true,
                "date": "2023-05-13T17:56:30.944Z"
            }
        }
    ```
    ---
    * #### Get peripheral list group by gateway
    1. URL: {{url}}/api/peripheral/by-gateway/645fad6f93aa2815004bb750
    2. Request method: GET
    3. Input body: Empty
    4. Output body
    ``` {
            "total": 8,
            "peripherals": [
                {
                    "_id": "645fcf4e6480f10530c5747a",
                    "uid": 1,
                    "vendor": "Vendor name 2",
                    "gateway": {
                        "_id": "645fad6f93aa2815004bb750",
                        "name": "Gateway 2"
                    },
                    "status": "online",
                    "state": true,
                    "date": "2023-05-13T17:56:30.944Z"
                },...
            ]
        }
    ```
    ---
    * #### Insert a peripheral
    1. URL: {{url}}/api/peripheral
    2. Request method: POST
    3. Input body:
        ``` {
            "vendor" : "samsung",
            "gateway" : "6460f156431d7a2fc93b826b"
        }  
        ```
    4. Output body
    ``` {
            "peripheral": {
                "uid": 27,
                "vendor": "samsung",
                "gateway": {
                    "_id": "6460f156431d7a2fc93b826b",
                    "name": "Gateway 3"
                },
                "status": "online",
                "state": true,
                "_id": "6462b918965cc362541d0bf8",
                "date": "2023-05-15T22:58:32.362Z"
            }
        }
    ```
    ---
    * #### Update a peripheral
    1. URL: {{url}}/api/peripheral/6462b918965cc362541d0bf8
    2. Request method: PUT
    3. Input body:
        ``` {
            "vendor" : "samsung",
            "gateway" : "6460f156431d7a2fc93b826b"
        }  
        ```
    4. Output
    ``` {
            "peripheral": {
                "_id": "6462b918965cc362541d0bf8",
                "uid": 27,
                "vendor": "Vendor name 2",
                "gateway": {
                    "_id": "64611d50431d7a2fc93b82e5",
                    "name": "Gateway 7"
                },
                "status": "online",
                "state": true,
                "date": "2023-05-15T22:58:32.362Z"
            }
        }
    ```
    ---
    * #### delete a peripheral
    1. URL: {{url}}/api/peripheral/6462b918965cc362541d0bf8
    2. Request method: DELETE
    3. Input body: Empty
        ```
    4. Output
    ``` {
            "peripheral": {
                "_id": "6462b918965cc362541d0bf8",
                "uid": 27,
                "vendor": "Vendor name 2",
                "gateway": {
                    "_id": "64611d50431d7a2fc93b82e5",
                    "name": "Gateway 7"
                },
                "status": "online",
                "state": false,
                "date": "2023-05-15T22:58:32.362Z"
            }
        }
    ```
    ---