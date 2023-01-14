const firebaseConfig = {
    apiKey: "AIzaSyCXMi1dIEEf2q1ANsz73HBSq6lm4gUMHxE",
    authDomain: "adv-c94-project.firebaseapp.com",
    databaseURL: "https://adv-c94-project-default-rtdb.firebaseio.com",
    projectId: "adv-c94-project",
    storageBucket: "adv-c94-project.appspot.com",
    messagingSenderId: "54209739252",
    appId: "1:54209739252:web:2bdde7f31aa21b5d7de1a1"
  };

  firebase.initializeApp(firebaseConfig);

  user_name=localStorage.getItem("username");
  room_name=localStorage.getItem("room_name");

  function send(){
    message=document.getElementById("message").value;

    firebase.database().ref(room_name).push({
          name:user_name,
          message:message,
          like:0,
    });
    document.getElementById("message").value="";
  }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
       firebase_message_id = childKey;
       message_data = childData;
       name=message_data['name'];
       message=message_data['message'];
       like=message_data['like'];
       
       name_tag="<h4>" + name + "<img class='user_tick'  style='width: 25px;' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrTNa26YCo4B1tVGDojhOxedVktzwQZ1BxIg&usqp=CAU' ></h4>";
       message_tag="<h4>" + message + "</h4>";
       like_tag="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatelike(this.id)'>" ;
       thumbs_up="<span class='glyphicon glyphicon-thumbs-up'>LIKE: " + like + "</span> </button>";
       row=name_tag + message_tag + like_tag + thumbs_up;
       document.getElementById("output").innerHTML += row;
    } });  }); }
getData();

function deleteuser(){
  localStorage.removeItem("username");
  localStorage.removeItem("room_name");
  window.location="index.html";
}

function updatelike(message_id) {
    button_id=message_id;
    likes=document.getElementById(button_id).value;
    updated_like=Number(likes) + 1;

    firebase.database().ref(room_name).child(message_id).update({
          like:updated_like
    });
}