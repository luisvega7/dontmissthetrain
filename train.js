

  // Initialize Firebase
    var config = {
      apiKey: "AIzaSyBSfN3FQwLsdbGpabX6xfff2SAP-IfsJvE",
      authDomain: "traintime-47695.firebaseapp.com",
      databaseURL: "https://traintime-47695.firebaseio.com",
      projectId: "traintime-47695",
      storageBucket: "traintime-47695.appspot.com",
      messagingSenderId: "249957461860"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    var trainName;
    var destination;
    var firstTrain;
    var frequency;
    
    
    
    $("#submitButton").on("click", function (event) { 
    
      event.preventDefault();
    
      trainName = $("#trainName").val().trim();
      destination = $("#destination").val().trim();
      firstTrain = $("#firstTrain").val().trim();
      frequency = $("#frequency").val();
    
      console.log(trainName);
    
    
      database.ref().push({
        name: trainName,
        destination: destination,
        fTrain: firstTrain,
        frequency: frequency,
      });
    
      database.ref().on("child_added", function (snapshot) {
    
        console.log(snapshot.val().name);
        console.log(snapshot.val().destination);
        console.log(snapshot.val().fTrain);
        console.log(snapshot.val().frequency);
    
        var firstTrainConverted = moment(snapshot.val().fTrain, "HH:mm").subtract(1, "years");
        // var currentTime = moment();
        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
        var tRemainder = diffTime % frequency;
        var tMinutesTillTrain = frequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextTrainTime = moment(nextTrain).format("hh:mm")
        
        $("#trainTable").append("<tr><td>" + (snapshot.val().name) + "</td><td>" + (snapshot.val().destination) + "</td><td>" + (snapshot.val().frequency) + "</td><td>" + nextTrainTime + "</td><td>"+ tMinutesTillTrain +"</td></tr>")
    
      }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });
      $("#submitButton").off("click");
    });
