function getConfigFirebase(){
    return config = {
        apiKey: "AIzaSyBiVeWJ94YHKG7sGSqsXyYmWqOvXB0z_lA",
        authDomain: "bdces-96e4f.firebaseapp.com",
        databaseURL: "https://bdces-96e4f.firebaseio.com",
        projectId: "bdces-96e4f",
        storageBucket: "bdces-96e4f.appspot.com",
        messagingSenderId: "869970911282"
    };
}

function initializeApp(){
    firebase.initializeApp(getConfigFirebase());
}

this.initializeApp = initializeApp;    
