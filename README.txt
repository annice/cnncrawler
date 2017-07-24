/*Pre-requisites*/
1. install npm
2. install mongodb and start mongod
C:\Program Files\MongoDB\Server\3.4\bin>mongod.exe --dbpath "C:\test\mongodbdata"

3. npm install -g json-server

/***Generate Crawler files ****/

1.cd crawler_code and in cmd 

 npm install
2. cd crawler_code/crawler

3. update cnn.html, inspect 'politics' on cnn.com and copy page source for all containers
(make sure the class tags match the sections, cnn updates its css and section headers from time to time)

4. node cnn.js
 (Then go to localhost:8081/scrape-> this will output individual crawler files)

5. cd..
json-server --watch db.js

/**News Portal**/

1. cd website
npm install
npm start

2. go to localhost:3002

