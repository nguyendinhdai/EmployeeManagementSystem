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
5. http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/employee/find/status/approved

Google clound message
===
A. http://daind-w7:10080/_MobileBrowserSimulator/index.html?webpage=http://daind-w7:10080/EmployeeManagementSystemClient/apps/services/preview/EmployeeManagementSystemClient/android/1.0/default/index.html&devicesFilePath=devices.json&skinsFilePath=skinslist.json&smartPreview=Off&platform=android&showSingleEnvironment=android&ips=192.168.0.30

B. http://daind-w7:10080/_MobileBrowserSimulator/index.html?webpage=http://daind-w7:10080/EmployeeManagementSystemManager/apps/services/preview/EmployeeManagementSystemManager/android/1.0/default/index.html&devicesFilePath=devices.json&skinsFilePath=skinslist.json&smartPreview=Off&platform=android&showSingleEnvironment=android&ips=192.168.0.30

C. https://console.developers.google.com
D. https://hub.jazz.net/

1. http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/token/remove/token1
2. http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/token/find/all
3. http://employeemanagementsystem-cloudant.eu-gb.mybluemix.net/token/add
	{
	    "token": "token1"
	}
	Content-Type: application/json
	
	
	
