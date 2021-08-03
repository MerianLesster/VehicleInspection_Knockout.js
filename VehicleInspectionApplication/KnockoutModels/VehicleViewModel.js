var vehicleViewModel;

// use as register Vehicle views view model
function Vehicle() {
    var self = this;
    self.Make = ko.observable("");
    self.Model = ko.observable("");
    self.Type = ko.observable("");

    self.Username = ko.observable("");
    self.Password = ko.observable("");

    self.InspectionReady = ko.observable(false);
    self.LoginSuccess = ko.observable(false);

    //self.CheckpointGroup = ko.observableArray([{ Name: "Interior", Checkpoints: ["AC", "Seats", "Steering wheel"] }]);

    self.models = ko.observableArray();
    self.models.removeAll();

    // Get Models based on the Make
    self.Make.subscribe(function () {
        setTimeout(function () {
            self.getModels();
        })
    });

    // Populate Vehicle Type based on the Model
    self.Model.subscribe(function () {
        setTimeout(function () {
            if (self.Model() && self.Model().Name) {
                if (self.Model().Name.includes("Corolla") || self.Model().Name.includes("A3") || self.Model().Name.includes("i8")) {
                    self.Type("Sedan");
                } else {
                    self.Type("SUV");
                }
            } else {
                self.Type("");
            }
        });
    });

    // Login and Authenticate User
    self.signInUser = function () {
        if (self.Username() && self.Password()) {
            var userObj = { Id: 0, Name: self.Username(), Password: self.Password() }
            $.ajax({
                url: '/api/User/?username=' + self.Username() + '&password=' + self.Password(),
                type: 'get',
                contentType: 'application/json',
                success: function (data) {
                    if (data.length > 0) {
                        self.LoginSuccess(true);
                        localStorage.setItem('user', JSON.stringify({ Id: data[0].Id, username: self.Username() }));
                    } else {
                        alert("Invalid Username or Password");
                        self.Username("");
                        self.Password("");
                    }
                }
            });
        }
    };


    // Get Makes
    self.makes = ko.observableArray();
    self.makes.removeAll();

    self.getMakes = function () {
        $.ajax({
            url: '/api/Make',
            type: 'get',
            contentType: 'application/json',
            success: function (data) {
                var arr = data.map(item => item);
                var iterator = arr.values();
                for (let elements of iterator) {
                    self.makes.push(elements);
                }
            }
        });
    };

    // Get Checkpoint Groups
    self.CheckpointGroup = ko.observableArray();
    self.CheckpointGroup.removeAll();

    self.getCheckpointGroup = function () {
        $.ajax({
            url: '/api/CheckpGroup',
            type: 'get',
            contentType: 'application/json',
            success: function (data) {
                var arr = data.map(item => item);
                var iterator = arr.values();
                for (let elements of iterator) {
                    self.CheckpointGroup.push(elements);
                }
            }
        });
    };

    // Get Models
    self.getModels = function () {
        if (self.Make() && self.Make().Id) {
            $.ajax({
                url: '/api/Model/?makeId=' + self.Make().Id,
                type: 'get',
                contentType: 'application/json',
                success: function (data) {
                    self.models.removeAll();
                    var arr = data.map(item => item);
                    var iterator = arr.values();
                    for (let elements of iterator) {
                        self.models.push(elements);
                    }
                }
            });
        }
    };

    // Add Vehicle
    self.addVehicle = function () {
        var vehicleObject = { Type: self.Type(), Model_Id: self.Model().Id }
        $.ajax({
            url: '/api/Vehicle',
            type: 'post',
            data: ko.toJSON(vehicleObject),
            contentType: 'application/json',
            success: function (vehicleRes) {
                console.log("Vehicle Success - ", vehicleRes);
                var userLocalStorage = localStorage.getItem('user');
                var inspecObject = { Date: new Date().toISOString(), Score: 0, UserId: JSON.parse(userLocalStorage).Id, VehicleId: vehicleRes.Id }
                $.ajax({
                    url: '/api/Inspection',
                    type: 'post',
                    data: ko.toJSON(inspecObject),
                    contentType: 'application/json',
                    success: function (data) {
                        self.InspectionReady(true);
                        console.log("Inspection Success - ", data);
                        self.getCheckpointGroup();
                    }
                });
            }
        });
    };
   
}

// create index view view model which contain two models for partial views
vehicleViewModel = { showVehicleViewModel: new Vehicle() };


// on document ready
$(document).ready(function () {

    // bind view model to referring view
    ko.applyBindings(vehicleViewModel);
    // Get data
    var userLocalStorage = localStorage.getItem('user');
    if (userLocalStorage) {
        vehicleViewModel.showVehicleViewModel.LoginSuccess(true);
        vehicleViewModel.showVehicleViewModel.Username(JSON.parse(userLocalStorage).username);
    } else {
        vehicleViewModel.showVehicleViewModel.LoginSuccess(false);
    }
    // load all make data
    vehicleViewModel.showVehicleViewModel.getMakes();

});