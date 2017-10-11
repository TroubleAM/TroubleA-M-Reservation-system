Reservation-System

Introduction 
It’s  website for medical services everyone can use it easily to check and  reserve an appointment for any doctor or any doctor can use it to schedule their dates .
what happens usually that you leave your work or your university or even your home to visit your doctor and when you come you'll find that you need to wait because there is a conflict in the appointment , or you don't know which clinics closer to you,or if you are a Doctor you want to schedule your dates as you planned without any mistakes, don't worry it'll not happens again "We care" website come with amazing solution "We care" a reservation System for medical services you can use it to reserve or schedule your date.





We used express for server {back-end} , mongoDB for database , and Angularjs framework for the {front-end} ,
 

“Back-end”
Server file  contains all the routings and the communication on the database 

“Database”
In database we used mongodb and we defined the admin Schema(just one table)
This table contains all the information about the doctors (username,password,phoneNumber,specialization,image , available appointment , and reserved appointments )and we export this module to use it in the required files .
 
“Front-end”
We used Angularjs for the Front-end because it’s single page apps , additional content brought into the web page without need to refresh , using views to achieve this .
 we create two folders  [components ,views ]and index.html and we’ll go over each one how it’s work:
Index.html :
	In this page we defined the Angularjs CDN instead of  download it because it’s
	Running faster than when it’s running from the hard desk ,
	Also we defined the bootstrap CDN for the style
And we connect all the pages together .
Components  folder :
Contents  a six files JS [admin.js , index.js , login.js , signup.js ,    
navBar.js] 
{{navBar}}
The main controller for the signup ,login logout and the home page
{{admin js}}
It contains the controller for the admin page(the functionality ) 
{{index js}}
It’s just to connect between the components and the controllers .

{{login js}}
It’s for the admins (doctors) he put the username and the password
And submit his information and the router will direct him to the admin
page.
{{signup js}}
It’s for any new admins (doctors ) who want to join “we care”
Site he should fill the required informations and upload his pic and after
Submit it the route will direct him to the login page 
{{main js}}
It’s for the main page (the patient ) how want to reserved an 
Appointments can choose the doctor ,  the time and the date and fill
His informations and submit it 

Views :
		Contains the templates files(the html files) which are connects with
		components(controllers) and we have six files[index html , admin html,
Navbar html ,login html , signup html, main html] we’ll go over them one by one :
{{main html}}
Contains the doctor's information  and you can click on one doctor and 
Reserve an appointment from his available appointment . 
{{admin html}}
		Contains the input fields (date , time) and the submit button to send the
appointment to the client page  , and shows the reserved appointments
{{login html}}
 Contains  the information inputs and the functionality  for submit the
Login because we use the method post instead of http or ajax request 
With the form tag 
{{signup html }}
 Contains  the information inputs and the functionality  for submit the
Signup because we use the method post instead of http or ajax request 
With the form tag
{{index html}}
It’s just to connect between the components and the controllers .
{{navBar html}}
It contains the signup , login , home page and website name and switch between pages if it’s(admin or client) 


 

