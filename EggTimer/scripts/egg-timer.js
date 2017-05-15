var app = angular.module('eggTimerApp', ['ngRoute'])

app.config(function ($routeProvider) {
    $routeProvider
    .when("/about", {
        templateUrl: "About.html",
        controller: "aboutController"
    })
    .otherwise({
        templateUrl: "EggTimer.html",
        controller: "eggTimerController"
    })

});

app.controller('aboutController', ['$scope', function ($scope) { }]);

app.controller('eggTimerController', ['$scope','$http', function ($scope, $http) {

    $scope.eggTypes = [{
        id: 1,
        label: 'Hen'
    },
   {
       id: 2,
       label: 'Duck'
   },
   {
       id: 3,
       label: 'Goose'
   }];

    $scope.eggSizes = [{
        id: 1,
        label: 'Large'
    },
    {
        id: 2,
        label: 'Medium'
    },
    {
        id: 3,
        label: 'Small'
    }];

    $scope.eggTextures = [{
        id: 1,
        label: 'Runny Soft-Boiled (barely set whites)'
    },
    {
        id: 2,
        label: 'Slightly Runny Soft-Boiled'
    },
    {
        id: 3,
        label: 'Custardy Yet Firm Soft-Boiled'
    },
    {
        id: 4,
        label: 'Firm Yet Creamy Hard-Boiled'
    },
    {
        id: 5,
        label: 'Very Firm Hard-Boiled'
    }];

    $scope.selectedType = $scope.eggTypes[0];
    $scope.selectedSize = $scope.eggSizes[1];
    $scope.recommendedTime = '1';
    $scope.timer = '0';
    $scope.isValidForm = false;
    $scope.eggDisplayClass = 'full-egg';
    $scope.timerStopped = true;
    $scope.timerFinished = false;
    $scope.eggData = $http.get("eggtimes.json").then(function (response) {
        return response.data.records;
    });

    $scope.setIsValidForm = function () {

        if ($scope.selectedTexture && $scope.selectedTexture.id > 0) {
            $scope.isValidForm = true;
            $scope.recommendedTime = 1;
        }
        else
            $scope.isValidForm = false;
    }

    $scope.startTimer = function () {

        var timerEnd = new Date();
        timerEnd.setMinutes(timerEnd.getMinutes() + parseInt($scope.recommendedTime));
        $scope.timerStopped = false;

        var x = setInterval(function () {
            var now = new Date();
            var nowMinutes = now.getTime();
            var endMinutes = timerEnd.getTime()
            var distance = endMinutes - nowMinutes;
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            $scope.timer = minutes + ':' + pad(seconds);

            if (minutes <= 0 && seconds <= 0) {
                $scope.eggDisplayClass = 'hatched-egg';
                $scope.timerStopped = true;
                $scope.timerFinished = true;
            }
            $scope.$apply();

        }, 1000);

    }

    function pad(d) {
        return (d < 10) ? '0' + d.toString() : d.toString();
    }

}]);