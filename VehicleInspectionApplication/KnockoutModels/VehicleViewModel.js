var vehicleViewModel;

// use as register Vehicle views view model
function Vehicle() {
    var self = this;
    self.Make = ko.observable("");
    self.Model = ko.observable("");
    self.Type = ko.observable("");
    self.StatusArr = ko.observableArray(['Pass', 'Fail']);
    self.Inspection = ko.observable("");
    self.Username = ko.observable("");
    self.Password = ko.observable("");

    self.InspectionReady = ko.observable(false);
    self.LoginSuccess = ko.observable(false);
    self.ShowSummary = ko.observable(false);

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
        if (!self.Make()) {
            alert("Please select the make of the vehicle");
            return;
        } if (!self.Model()) {
            alert("Please select the model of the vehicle");
            return;
        }
        var vehicleObject = { Type: self.Type(), Model_Id: self.Model().Id }
        $.ajax({
            url: '/api/Vehicle',
            type: 'post',
            data: ko.toJSON(vehicleObject),
            contentType: 'application/json',
            success: function (vehicleRes) {
                var userLocalStorage = localStorage.getItem('user');
                var inspecObject = { Date: new Date().toISOString(), Score: 0, UserId: JSON.parse(userLocalStorage).Id, VehicleId: vehicleRes.Id }
                // Create Inspection
                $.ajax({
                    url: '/api/Inspection',
                    type: 'post',
                    data: ko.toJSON(inspecObject),
                    contentType: 'application/json',
                    success: function (data) {
                        self.Inspection(data);
                        self.getCheckpointGroup();
                    }
                });
            }
        });
    };

    // self.CheckpointGroup = ko.observableArray([{ Name: "Interior", Checkpoints: ["AC", "Seats", "Steering wheel"] }]);

    // Get Checkpoint Groups
    self.CheckpointGroup = ko.observableArray();
    self.CheckpointGroup.removeAll();

    self.getCheckpointGroup = async function () {
        $.ajax({
            url: '/api/CheckpGroup',
            type: 'get',
            contentType: 'application/json',
            success: async function (data) {
                var arr = data.map(item => item);
                var iterator = arr.values();
                for (let elements of iterator) {
                    self.CheckpointGroup.push(elements);
                }
                for (var i = 0; i < self.CheckpointGroup().length; i++) {
                    await self.getCheckpoint(self.CheckpointGroup()[i].Id);
                    self.CheckpointGroup()[i].Checkpoints.push(self.Checkpoints());
                    self.Checkpoints([]);
                }
                self.InspectionReady(true);
            }
        });
    };


    // Get Checkpoint based on checkpoint groups
    self.Checkpoints = ko.observableArray();
    self.Checkpoints.removeAll();

    self.getCheckpoint = async function (ckpGroupId) {
        await $.ajax({
            url: '/api/Checkpoint/?ckpGroupId=' + ckpGroupId + '&vehicleType=' + self.Type(),
            type: 'get',
            contentType: 'application/json',
            success: function (data) {
                var arr = data.map(item => item);
                var iterator = arr.values();
                for (let elements of iterator) {
                    self.Checkpoints.push(elements);
                }
            }
        });
    };


    // Add Inspection Checkpoint
    self.addInspecCheckpoint = function (data, event) {
        let checkpointId = event.target.getAttribute("CpId");
        let comment = document.getElementById("comment" + checkpointId).value;
        let status = document.getElementById("status" + checkpointId).value;
        if (!status) {
            alert("Please select the status");
            return;
        }
        var chpObj = { CheckpId: checkpointId, InspecId: self.Inspection().Id, Status: status, Comment: comment }
         $.ajax({
             url: '/api/InspecCheckpoint',
             type: 'post',
             data: ko.toJSON(chpObj),
            contentType: 'application/json',
             success: function (data) {
                 document.getElementById("btn" + checkpointId).style.visibility = "hidden";
                 document.getElementById("comment" + checkpointId).disabled = true;
                 document.getElementById("status" + checkpointId).disabled = true;
            }
        });
    };


    // View Inspection Summary
    self.finalInspecArr = ko.observableArray();
    self.finalInspecArr.removeAll();

    self.viewInspecSummary = function () {
        $.ajax({
            url: '/api/InspecCheckpoint/?inspecId=' + self.Inspection().Id,
            type: 'get',
            contentType: 'application/json',
            success: function (data) {
                self.finalInspecArr.removeAll();
                var arr = data.map(item => item);
                var iterator = arr.values();
                for (let elements of iterator) {
                    self.finalInspecArr.push(elements);
                }
                self.ShowSummary(true);
                self.calculateScore();
            }
        });
    };


    self.calculateScore = function () {
        console.log("test - ", self.finalInspecArr());
        let checkpointGScore = 0;
        let inspectionScore = 0;
        var arr = [];
        var scoreArr = [];
        for (let i = 0; i < self.finalInspecArr().length; i++) {
            arr[i] = { CkpGroupId: self.finalInspecArr()[i].Checkpoint.CkpGroupId, Grade: self.finalInspecArr()[i].Checkpoint.Grade * 10, Status: self.finalInspecArr()[i].Status }
        }
        let obj = arr.reduce((res, curr) => {
            if (res[curr.CkpGroupId])
                res[curr.CkpGroupId].push(curr);
            else
                Object.assign(res, { [curr.CkpGroupId]: [curr] });

            return res;
        }, {});
        console.log("calculateScore arr - ", obj);

        for (var one in obj) {
            for (var i in one) {
                if (i.Status == "Pass") {
                    checkpointGScore = checkpointGScore + i.Grade;
                    scoreArr.push(checkpointGScore);
                }
            }
        }

        let inspecObject1 = { Score: 90}
        // Update Inspection
        $.ajax({
            url: '/api/Inspection/?id=' + self.Inspection().Id,
            type: 'put',
            data: ko.toJSON(inspecObject1),
            contentType: 'application/json',
            success: function (data) {
            }
        });
    }
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