### Todo App
Todo App built with ReactJs, Django and Mysql  

#### To setup fresh DB run:
1. python src/manage.py makemigrations  
2. python src/manage.py migrate  

#### Start Frontend Server
```
cd frontend
npm install
npm start
```
####  Start Backend Server
Before running the sure make sure you have django installed by using this command
```
python -m django --version
```
if you don't have it then install it using 
```
python -m pip install Django
```
Then run the server
```
cd backend/src 
python manage.py runserver
```

Main Frontend File  
frontend/src/Pages/Todo/ListBucketsAndTodos/ListBucketsAndTodos.js  

Main Backend File  
backend/src/src/views.py  