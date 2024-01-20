import { GoogleAuthProvider, getRedirectResult, signInWithRedirect, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../core/firebaseConfig"
import { saveClient } from "../apps/thunks/save-client";
import { useAppDispatch } from "../apps/hooks/hook";

// Use language of browser
auth.useDeviceLanguage()

export const registerWithGoogleAccount = async () => {
    const provider = new GoogleAuthProvider();

    // Add Scope 
    provider.addScope('profile');
    provider.addScope('email');

    signInUserWithProvider(provider);
}


export const registerWithFacebookAccount = async () => {
    // Create a reference to sign-in with github account
    const provider = new FacebookAuthProvider();

    // Add Scope 
    provider.addScope('user_birthday');

    // Log in an Google Account
    signInUserWithProvider(provider);

}

export const logout = async () => {
    // Log out
    await auth.signOut()
}

// Type provider of signing-in
type TypeAuthProvider = GoogleAuthProvider | FacebookAuthProvider;

async function signInUserWithProvider<T extends TypeAuthProvider>(provider: T) {
    let result;
    // Trigger a full-page redirect from my app
    if (window.innerWidth <= 768) {
        await signInWithRedirect(auth, provider)
        // Get result of redirect
        result = await getRedirectResult(auth)
    }
    else {
        result = await signInWithPopup(auth, provider);
        
    }

    if (result) {
        // signed-in user
        return;
    }
    // Trigger Exception
    throw Error("Une erreur s'est produite lors de la connexion");
}