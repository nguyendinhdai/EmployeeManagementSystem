Employee Management System
===
This application is a Nodejs application and will be deployed on IBM Bluemix. This app will provide a list of services that allow to:

-	Save/Get employee's info (use BluemixCloudant database),
-	Get a list of employees,
-	Send a Push notification to Mobile Manager app (once new employee's info is saved in Cloudant database) to inform Manager that there is a waiting request for approval.

REST API
===
Get a list of employees:
- http://kien-employeemanagementsystem.eu-gb.mybluemix.net/find/all

Save/Get employee's info (use BluemixCloudant database):
- http://kien-employeemanagementsystem.eu-gb.mybluemix.net/add
- http://kien-employeemanagementsystem.eu-gb.mybluemix.net/find/00679

Data for testing:
{
    "employee_id": "00679",
    "full_name": "Nguyen Dinh Dai",
	"age": 30
}

Google clound message
===
Please vitsit link for the details API:
https://console.developers.google.com
https://hub.jazz.net/

http://kien-employeemanagementsystem.eu-gb.mybluemix.net/regToken
Data for testing:
{
    "token": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
Content-Type: application/json
