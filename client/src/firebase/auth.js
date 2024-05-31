import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithEmailAndPassword, signInWithPopup, fetchSignInMethodsForEmail } from "firebase/auth";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async (setAuthError) => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error("Error during Google sign-in: ", error);
    if (error.code === 'auth/account-exists-with-different-credential') {
      const email = error.customData.email;
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      error.customData.signInMethods = signInMethods;
      setAuthError("This email is already in use. Sign in with GitHub or use a different email.");
    } else {
      setAuthError(error.message);
    }
  }
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doSignInWithGithub = async (setAuthError) => {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    console.error("Error during GitHub sign-in: ", error);
    if (error.code === 'auth/account-exists-with-different-credential') {
      const email = error.customData.email;
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      error.customData.signInMethods = signInMethods;
      setAuthError("This email is already in use. Sign in with Google or use a different email.");
    } else {
      setAuthError(error.message);
    }
  }
};

// export const doPasswordReset = (email) => {
//     return sendPasswordResetEmail(auth, email);
// };

// export const doPasswordChange = (password) => {
//     return updatePassword(auth, currentUser, password);
// };

// export const doSendEmailVerification = () => {
//     return sendEmailVerification(auth.currentUser, {
//         url: `${window.location.origin}/home`,
//     });
// };
