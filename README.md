![image](https://user-images.githubusercontent.com/77121609/227809737-6f06dc29-79d6-4df5-be49-6877af93d286.png)


The UTDesign Fabrication Shop is looking for an automated software solution to track inventory based on input through a web application code from the team. The current inventory management requires paper logs that are later entered manually into an Excel spreadsheet. Therefore, project Tool Crib is essential to ensure UTDesign’s tool checkout integrity and make the tool checkout logging easier and more accountable. Fabrication Shop workers will use the finished product to check out the tools for a user.

The long-term goal of this project is to create a digitalized inventory checkout that can be used to prevent teams from hoarding tools and encourage students to attend training in order to gain more tokens. By the end of this semester, we aim to complete this project by developing our knowledge of ReactJS, JavaScript, CSS/HTML, and SQL. Initially, the project was supposed to include a barcode system that can be scanned through the UTDesign barcode scanner, however, after discussing with the project partner, we decided it would be more effective to do an online web app that didn’t rely on a barcode due to the issue that barcodes will fade through wear and tear.

Gene Woten is the Studio Manager of UTDesign, and Timothy Givens is the Studio Assistant Manager. They both work for UTDesign and realized the issue of their current inventory situation. As of right now, it is paper-based and unorganized which leaves teams unaccountable about the tools they may be hoarding. Additionally, they realized a lack of attendance in their training sessions. Combining these factors, their mission is to create a digitalized system to track teams who checkout inventory as well as create a token system that encourages attendance to their training.

Instructions on how to Install this app and set it up.

1.) Clone the Repo. 

2.) there are 2 folders in the project server and utd-tool-crib. utd-tool-crib is the front end part of the project and server is the back end part of the project.

for the front end(utd-tool-crib) you have to install the following packages for the project. so cd utd-tool-crib and then npm install all these packages

react-router-dom : used to route to everypage on the web app

axios : alternative to fetch easier to use and to push objects to the back end.

xlsx : used to work with excel sheets to read the data from the excel sheets for import and also writing files to export excel sheets.

also do 'npm i' once for good measure once(installing all the node modules).

for the back end(server) you have to install the following packages for the project. so cd .. to the main folder and then cd server, and then npm install all these packages.

express : used to create the back end server and the rest API for the web app.

cors : used to bypass restrictions to access different ports to push data onto the frontend.

mysql : used to interact with the MySQL database and access data.

express-async-handler : used to handle calls to the backend from express the asynch way.

also run npm init -y and npm i once for good measure.

now you've installed everything related to the front end and back end.

3.) Install and set up the database.

First Install XAMPP this application will host/start/stop the sql database server for us to use. (Search on google)

Next we need to install mysql community server which is necessary for use to use mysql and also lastly we will need mysql workbench. (Find both on google on the official oracle website.)

After you've installed everything and set up everything it's time to set up the database on work bench.

open your local connection and then create a new schema called toolcrib by right clicking on the left sidebar.

<img width="201" alt="image" src="https://user-images.githubusercontent.com/58540957/236378829-6b37fd91-fd92-4174-bb17-d5c0f21f175f.png">

That will be how it will look at the end for now you will have nothing under Tables. 

right click on Tables and create new table called 'managelogs' and edit it until it looks like the below schema.

<img width="638" alt="image" src="https://user-images.githubusercontent.com/58540957/236379023-3d74b1d6-a7ab-4638-a39e-a2706e4bd975.png">

click apply, and you have set up the first table repeat for the next three.

right click on Tables and create new table called 'managelogs' and edit it until it looks like the below schema.

