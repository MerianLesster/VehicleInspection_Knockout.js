var vehicleViewModel;

// use as register Vehicle views view model
function Vehicle() {
    var self = this;
    self.Make = ko.observable("Audi");
    self.Model = ko.observable("A3");
    self.Type = ko.observable("");

    self.Model.subscribe(function () {
        setTimeout(function () {
            if (ko.toJSON(self.Model)) {
                if (ko.toJSON(self.Model).includes("Corolla") || ko.toJSON(self.Model).includes("A3")) {
                    console.log("Sedan")
                    self.Type("Sedan");
                } else {
                    console.log("SUV")
                    self.Type("SUV");
                }
            }
        });
    });

    self.addVehicle = function () {
        var dataObject = ko.toJSON(this);
        $.ajax({
            url: '/api/Vehicle',
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function (data) {
                console.log("Success - ", data);
            }
        });
    };

    self.makes = ko.observableArray();
    self.makes.removeAll();

    self.getMakes = function () {
        $.ajax({
            url: '/api/Make',
            type: 'get',
            contentType: 'application/json',
            success: function (data) {
                var arr = data.map(item => item.Name);
                var iterator = arr.values();
                for (let elements of iterator) {
                    self.makes.push(elements);
                }
            }
        });
    };

    self.models = ko.observableArray();
    self.models.removeAll();

    self.getModels = function () {
        var strWithOutQuotes = ko.toJSON(self.Make).replace(/"/g, '');
        $.ajax({
            url: '/api/Model/?makeName=' + strWithOutQuotes,
            type: 'get',
            contentType: 'application/json',
            success: function (data) {
                self.models.removeAll();
                var arr = data.map(item => item.Name);
                var iterator = arr.values();
                for (let elements of iterator) {
                    self.models.push(elements);
                }
            }
        });
    };
}

// use as register Inspection views view model
function Inspection() {
    var self = this;
    self.CheckpointGroup = ko.observableArray([{ Name: "Interior", Checkpoints: ["AC", "Seats", "Steering wheel"] }]);
}

// create index view view model which contain two models for partial views
vehicleViewModel = { showVehicleViewModel: new Vehicle(), showInspectionViewModel: new Inspection() };


// on document ready
$(document).ready(function () {

    // bind view model to referring view
    ko.applyBindings(vehicleViewModel);

    // load all make data
    vehicleViewModel.showVehicleViewModel.getMakes();
    // load all model data
     vehicleViewModel.showVehicleViewModel.getModels();

});