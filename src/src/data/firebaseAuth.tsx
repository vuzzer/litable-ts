import { GoogleAuthProvider, getAuth, getRedirectResult, signInWithRedirect, signOut, FacebookAuthProvider } from "firebase/auth";
import { app } from "../core/firebaseConfig"


export const registerWithGoogleAccount = async () => {
    const provider = new GoogleAuthProvider();

    // Add Scope 
    provider.addScope('profile');
    provider.addScope('email');

    await signInUserWithProvider(provider);
}


export const registerWithFacebookAccount = async () => {
    // Create a reference to sign-in with github account
    const provider = new FacebookAuthProvider();

    // Add Scope 
    provider.addScope('user_birthday');

    await signInUserWithProvider(provider);

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
        console.log(result.user);
        return result.user;
    }

    // Trigger Exception
    throw Error();
}