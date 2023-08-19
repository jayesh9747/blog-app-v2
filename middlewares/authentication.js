const { checkUserToken } = require("../services/userAuthentication");

function checkForAuthenticationCookie(cookieName){
    return (req,res,next)=>{
        const tokencookievalue = req.cookies[cookieName];

        if(!tokencookievalue){
         return next();
        }
        try {
            const userPayload = checkUserToken(tokencookievalue);
            req.user = userPayload;
        } catch (error) {}
        return  next();
    }
}

module.exports = {
    checkForAuthenticationCookie,
}