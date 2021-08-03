// Function to check password security
let checkPassword = function(inputtxt) { 
    // Password more than 6 and less thatn 20 caracteres
    var passw = /(\d{6,20})/g;
    // Password must contain a number
    var passw1 = /^(?=.*\d)/g;
    // Password must contain at least 1 lower letter
    var passw2 = /^(?=.*[a-z])/g;
    // Password must contain at least 1 capital letter
    var passw3 = /^(?=.*[A-Z])/g;

    var arr = {conditional : false , message : "You password must have " };
    const concidence = inputtxt.match(passw);
    const concidence1 = inputtxt.match(passw1);
    const concidence2 = inputtxt.match(passw2);
    const concidence3 = inputtxt.match(passw3);
    
        if(concidence && concidence1 && concidence2 && concidence3) 
        { 
        arr.conditional = true ;
        return arr;
        }
        if(!concidence) 
        { 
        arr.message += " more than 6 and less than 20 caracteres";
        }
        if(!concidence1) 
        { 
        arr.message += " contain at least a number";
        }
        if(!concidence2) 
        {
        arr.message += " 1 minusculas";
        }
        if(!concidence2) {
        arr.message += " 1 mayusculas";
        }
        return arr;
}
// Function to Modify array of likes or dislikes
let modifyArray = function(usersArray,userId,option) {
  
if(usersArray.length != 0){
    for (i = 0 ; i < usersArray.length ; i++ ){
        if (option === 'Delete'){
            if (usersArray[i] === userId){
            let index = i;
            usersArray.splice(index, 1);
            return usersArray;
            }
        }
        if (option === 'Add'){
            usersArray.push(userId);
            return usersArray;
        }
    }
}else{
    
    usersArray.push(userId);
    return usersArray;  
}
        
}

//Function to check if the user that is liking or disliking is in the array.
let exitsUser = function(usersArray,userId) {
    if(usersArray.length != 0){
        for (i = 0 ; i < usersArray.length ; i++ ){
                if (usersArray[i] === userId){
                return true;
                }
            }
            return false;
        }
    }
        
module.exports = {
    checkPassword,
    modifyArray,
    exitsUser
}
