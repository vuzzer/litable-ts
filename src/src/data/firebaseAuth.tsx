import { GoogleAuthProvider, getAuth, getRedirectResult, signInWithRedirect, signOut, FacebookAuthProvider } from "firebase/auth";
import { app } from "../core/firebaseConfig"
import { User } from "../domain/entities/users";
import { UserCollection } from "../core/databases/userCollection";


export const registerWithGoogleAccount = async () => {
    const provider = new GoogleAuthProvider();

    // Add Scope 
    provider.addScope('profile');
    provider.addScope('email');

    // Log in an Google Account
    const user = await signInUserWithProvider(provider);

    // Insert in firestore
    await UserCollection.insert(user);
}


export const registerWithFacebookAccount = async () => {
    // Create a reference to sign-in with github account
    const provider = new FacebookAuthProvider();

    // Add Scope 
    provider.addScope('user_birthday');

    // Log in an Google Account
    const user = await signInUserWithProvider(provider);

    // Insert in firestore
    await UserCollection.insert(user);
}

export const logout = async () => {
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app)
    // Use language of browser
    auth.useDeviceLanguage()

    // Log out
    await signOut(auth)
}

// Type provider of signing-in
type TypeAuthProvider = GoogleAuthProvider | FacebookAuthProvider;

async function  signInUserWithProvider<T extends TypeAuthProvider > (provider: T){
    // Initialize Firebase Authentication and get a reference to the service
    const auth = getAuth(app)
    // Use language of browser
    auth.useDeviceLanguage()

    // Trigger a full-page redirect from my app
    await signInWithRedirect(auth, provider)

    // Get result of redirect
    const result = await getRedirectResult(auth)

    if (result) {
        // signed-in user
        let user = new User(result.user.email as string, result.user.displayName as string, result.user.uid)
        return user;
    }

    // Trigger Exception
    throw Error();
}