class User{
    _email:string;
    _username:string;

    // Constructor
    constructor(email: string, username:string){
        this._email = email;
        this._username = username;
    }

    static fromJson(json: DSUser): User{
        return new User(json.email, json.username);
    }

    toJson():DSUser{
        return {email: this._email, username: this._username};
    }
}

// DsUser : DataStructureUser
interface DSUser {
    email: string,
    username: string
}