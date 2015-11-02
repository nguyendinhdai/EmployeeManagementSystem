Employee Management System
===
This application is a Nodejs application and will be deployed on IBM Bluemix. This app will provide a list of services that allow to:

-	Save/Get employee's info (use BluemixCloudant database),
-	Get a list of employees,
-	Send a Push notification to Mobile Manager app (once new employee's info is saved in Cloudant database) to inform Manager that there is a waiting request for approval.

Status's Employee
===
1. pending
2. approved
3. rejected

REST API
===
1. http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/employee/find/all
2. http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/employee/add
	{
	    "employee_id": "00679",
	    "full_name": "Nguyen Dinh Dai",
		"age": 30
	}
3. http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/employee/update
	{
	    "employee_id": "9999999999",
	    "status": "approved"
	}
4. http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/employee/find/5555555555
5. http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/employee/find/status/pending

Google clound message
===
- <permission android:name="com.google.android.c2dm.permission.RECEIVE"></permission>

1. http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/token/remove/token1
2. http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/token/find/all
3. http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/token/add
	{
	    "token": "token1"
	}
	Content-Type: application/json
	
	
	
