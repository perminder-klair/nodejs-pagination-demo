var express = require('express');
var app = express();

app.set('views', 'views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(req, res){

	//set default variables
	var totalStudents = 80,
		pageSize = 8,
		pageCount = 80/8,
		currentPage = 1,
		students = [],
		studentsArrays = [], 
		studentsList = [];

	//genreate list of students
	for (var i = 1; i < totalStudents; i++) {
		students.push({name: 'Student Number ' + i});
	}

	//split list into groups
	while (students.length > 0) {
	    studentsArrays.push(students.splice(0, pageSize));
	}

	//set current page if specifed as get variable (eg: /?page=2)
	if (typeof req.query.page !== 'undefined') {
		currentPage = +req.query.page;
	}

	//show list of students from group
	studentsList = studentsArrays[+currentPage - 1];

	//render index.ejs view file
	res.render('index', {
		students: studentsList,
		pageSize: pageSize,
		totalStudents: totalStudents,
		pageCount: pageCount,
		currentPage: currentPage
	});
});

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});