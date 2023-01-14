const firebaseConfig = {
  apiKey: "AIzaSyCXMi1dIEEf2q1ANsz73HBSq6lm4gUMHxE",
  authDomain: "adv-c94-project.firebaseapp.com",
  databaseURL: "https://adv-c94-project-default-rtdb.firebaseio.com/",
  projectId: "adv-c94-project",
  storageBucket: "adv-c94-project.appspot.com",
  messagingSenderId: "54209739252",
  appId: "1:54209739252:web:2bdde7f31aa21b5d7de1a1"
};

firebase.initializeApp(firebaseConfig);



  function addroom(){
    createworld=document.getElementById("createworld").value;
    firebase.database().ref("/").child(createworld).update({
          purpose:"adding room name"
    })
    localStorage.setItem("room_name", createworld);
    window.location="kwitter_page.html";
}

function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
Room_names = childKey;
console.log(Room_names);
row="<div class='room_name' id="+Room_names+" onclick='redirecttoroomname(this.id)'>#" + Room_names + "</div><hr>";
document.getElementById("output").innerHTML += row;
});});}
getData();

function redirecttoroomname(name){
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location="kwitter_page.html";
}

function deleteuser(){
  localStorage.removeItem("username");
  localStorage.removeItem("room_name");
  window.location="index.html";
}