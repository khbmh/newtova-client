import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import auth from '../utils/firebase.config';

export const AuthContext = createContext(null);
function AuthProvider({ children }) {

  const [isShow, setIsShow] = useState(false);
  const handleShowHide = () => setIsShow(!isShow);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const handleMenuVisible = () => {
    setMenuVisible(!menuVisible);
  };
  const handleUpdateProfile = (userName, imgLink) =>
    updateProfile(auth.currentUser, {
      displayName: userName,
      photoURL: imgLink,
    })
      .then(() => {
        toast.success('User Registration Success');
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode, 'error occurred');
      });

  const handleRegister = (userName, imgLink, email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        handleUpdateProfile(userName, imgLink);
        // toast.success('User Registration Success');
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode, 'error occurred');
      });
  };
  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('Logged in successfully');
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode, 'error occurred');
      });
  };

  const signInWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(auth, googleProvider)
      .then((userCredential) => {
        toast.success('Logged in successfully');
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode, 'error occurred');
      });
  };
  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logged out successfully');
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode, 'error occurred');
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  const authData = {
    user,
    handleRegister,
    handleLogin,
    menuVisible,
    handleMenuVisible,
    setUser,
    loading,
    setLoading,
    signInWithGoogle,
    handleSingOut,
    handleShowHide,
    setIsShow,
    isShow,
  };
  return (
    <AuthContext.Provider value={authData}>
      {children}
      <Toaster />
    </AuthContext.Provider>
  );
}

export default AuthProvider;
