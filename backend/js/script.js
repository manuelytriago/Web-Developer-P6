let checkPassword = function(inputtxt) { 

    var passw = /(\d{6,20})/g;
    var passw1 = /^(?=.*\d)/g;
    var passw2 = /^(?=.*[a-z])/g;
    var passw3 = /^(?=.*[A-Z])/g;



    var arr = {conditional : false , message : "You password must have " };
    const concidence = inputtxt.match(passw);
    const concidence1 = inputtxt.match(passw1);
    const concidence2 = inputtxt.match(passw2);
    const concidence3 = inputtxt.match(passw3);
    
        if(concidence && concidence1 && concidence2 && concidence3) 
        { 
        arr.conditional = true ;
        arr.message = "Good"
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

let checkUser = function(usersArray,userId,option) {
  
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
    checkUser,
    exitsUser
}
