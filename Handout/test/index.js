let name = "Sara"; 

  let hobbies = ["Lesen", "Schwimmen", "Programmieren"]; 
      
    function checkDrivingPermission(age) {
    const legalDrivingAge = 18; 
    const isAllowed = (age >= legalDrivingAge); 
      
  let result = "";
      
  if (isAllowed) {
    result += name + " darf Auto fahren.<br>";
  } else {
    result += name + " darf noch kein Auto fahren.<br>";
  }
      
  result += name + " hat folgende Hobbys:<br><ul>";
      
  for (let i = 0; i < hobbies.length; i++) {
    result += "<li>" + hobbies[i] + "</li>";
  }
      
  result += "</ul>";
      
  let random = Math.floor(Math.random() * hobbies.length);
  let randomHobby = hobbies[random];
  result += "<br>Ein zufälliges Hobby von " + name + " ist: <strong>" 
  + randomHobby + "</strong>";
      
  return result;
  }
      
  document.getElementById("checkBtn").addEventListener
  ("click", () => {
   const age 
   = parseInt(document.getElementById("ageInput").value, 10);
   const output = checkDrivingPermission(age);
   document.getElementById("output").innerHTML = output;
  });
