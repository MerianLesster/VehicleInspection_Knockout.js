var vehicleViewModel;

// use as register student views view model
function Vehicle(id, make, model, type) {
    var self = this;

    // observable are update elements upon changes, also update on element data changes [two way binding]
    //self.Id = ko.observable(id);
    self.Make = ko.observable(make);
    self.Model = ko.observable(model);
    self.Type = ko.observable(type);

    // create computed field by combining first name and last name
    //self.FullName = ko.computed(function () {
    //    return self.FirstName() + " " + self.LastName();
    //}, self);

    //self.Age = ko.observable(age);
    //self.Description = ko.observable(description);
    //self.Gender = ko.observable(gender);

    // Non-editable catalog data - should come from the server
    //self.makes = [
    //    "Toyota",
    //    "BMW",
    //    "Benz"
    //];

    self.addVehicle = function () {
        console.log("Heloooooooooo");
        var dataObject = ko.toJSON(this);
        console.log("Output - ", dataObject);

        // remove computed field from JSON data which server is not expecting
        // delete dataObject.FullName;

        $.ajax({
            url: '/api/Vehicle',
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function (data) {
                console.log("Success - ", data);
               // vehicleViewModel.studentListViewModel.students.push(new Student(data.Id, data.FirstName, data.LastName, data.Age, data.Description, data.Gender));

                //self.Id(null);
                self.Make('');
                self.Model('');
                self.Type('');
            }
        });
    };
}

// use as student list view's view model
//function StudentList() {

//    var self = this;

//    // observable arrays are update binding elements upon array changes
//    self.students = ko.observableArray([]);

//    self.getStudents = function () {
//        self.students.removeAll();

//        // retrieve students list from server side and push each object to model's students list
//        $.getJSON('/api/student', function (data) {
//            $.each(data, function (key, value) {
//                self.students.push(new Student(value.Id, value.FirstName, value.LastName, value.Age, value.Description, value.Gender));
//            });
//        });
//    };


//    // remove student. current data context object is passed to function automatically.
//    self.removeStudent = function (student) {
//        $.ajax({
//            url: '/api/student/' + student.Id(),
//            type: 'delete',
//            contentType: 'application/json',
//            success: function () {
//                self.students.remove(student);
//            }
//        });
//    };
//}


// create index view view model which contain two models for partial views
vehicleViewModel = { showVehicleViewModel: new Vehicle() }; //, studentListViewModel: new StudentList()


// on document ready
$(document).ready(function () {

    // bind view model to referring view
    ko.applyBindings(vehicleViewModel);

    // load student data
    //vehicleViewModel.studentListViewModel.getStudents();
});