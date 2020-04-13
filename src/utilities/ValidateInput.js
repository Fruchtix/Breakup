//Validates the Userinput
export const validate = (type, text) => {
    alph=/^[a-zA-ZäöüÄÖÜ -]+$/
    email=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // pass=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    pass=/.{8,}$/

    if(text==='') {
        return false
    }
    if(type==="password") {
        if(pass.test(text)) {
            return true
        } else {
            return false
        }
    } 
    else if(type==="email") {
        if(email.test(text)) {
            return true
        } else {
            return false
        }
    } 
    else if(type==="text") {
        if(alph.test(text)) {
            return true
        } else {
            return false
        }
    } 

    return false
}