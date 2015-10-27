Employee Management System
===
This application is a Nodejs application and will be deployed on IBM Bluemix. This app will provide a list of services that allow to:

-	Save/Get employee's info (use BluemixCloudant database),
-	Get a list of employees,
-	Send a Push notification to Mobile Manager app (once new employee's info is saved in Cloudant database) to inform Manager that there is a waiting request for approval.

REST API
===
Get a list of employees:
http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/employee/find/all

Save/Get employee's info (use BluemixCloudant database):
http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/employee/add
http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/employee/find/00679

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

http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/token/remove/token1
http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/token/find/all
http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/token/add
Data for testing:
{
    "token": "token1"
}
Content-Type: application/json
