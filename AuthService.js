import buf from 'buffer';

class AuthService{
    login(cred,cb){
        let b = buf.Buffer(cred.username + ':' + cred.password );
        let encodeAuth = b.toString('base64');

        fetch('https://api.github.com/user',{
            headers: {
                Authorization: 'Basic ' + encodeAuth
            }
        }).then((response) => {
            if(response.status >= 200 && response.status < 300){
                return response;
            }
            throw{
                badCredentials: response.status == 401,
                unknownError: response.status != 401,
                success: false
            }
        }).then((response) => {
            return response.json();
        }).then((results) => {
            cb({success: true});
        }).catch((err) => {
            cb(err);
        })
    }
}

module.exports = new AuthService();