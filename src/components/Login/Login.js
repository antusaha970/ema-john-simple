import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import firebaseConfig from './firebase.config';
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";



firebase.initializeApp(firebaseConfig);

function Login() {
  const [isNewUser, setIsNewUser] = useState(false);
  const [user, setUser] = useState({
    isLoggedIn: false,
    name: '',
    email: '',
    photo: '',
    error: '',
    success: false
  });

  const [loggedInUser,setLoggedInUser] = useContext(UserContext);

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then(res => {
        const { displayName, email, photoURL } = res.user;
        const userInfo = {
          isLoggedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(userInfo);
        console.log(displayName, email, photoURL);
      })
      .catch(err => {
        console.log(err);
      })
  }
  const handleSignOut = () => {
    firebase.auth().signOut().then(res => {
      const userInfo = {
        isLoggedIn: false,
        name: '',
        email: '',
        password: '',
        photo: ''
      }
      setUser(userInfo);
    })
      .catch(err => {
        console.log(err);
      })

  }

  const handleSubmit = (e) => {
    if (isNewUser && user.email && user.password) {

      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          newUserInfo.name = user.name;
          setUser(newUserInfo);
          updateUserName(user.name);
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          setUser(newUserInfo);
          // ..
        });

    }
    if (!isNewUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((userCredential) => {
          // Signed in
        //   var user = userCredential.user;
          const newUserInfo = { ...user };
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
          console.log(user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          const newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          setUser(newUserInfo);
        });
    }

    e.preventDefault();
  }

  const handleBlur = (e) => {
    let isFormValid = true;
    if (e.target.name === 'email') {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPassValid = /^[A-Za-z]\w{7,14}$/.test(e.target.value);
      const isLong = e.target.value.length >= 8;
      isFormValid = isPassValid && isLong;
    }
    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      console.log(newUserInfo);
      setUser(newUserInfo);
    }
  }

  const updateUserName = (name) => {
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(() => {
      // Update successful
      console.log('successfully updated name');
      // ...
    }).catch((error) => {
      // An error occurred
      console.log(error);
      // ...
    });
  }

  return (
    <div style={{textAlign:'center'}}>
      <h1>Ema-john</h1>
      <p>Sign in with google</p>
      {
        user.isLoggedIn ? <button onClick={handleSignOut} >Sign out</button> : <button onClick={handleSignIn} >Sign in</button>
      }
      {
        user.isLoggedIn && <div>
          <p>Welcome </p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }
      <h2>Our own Authentication</h2>
      <form onSubmit={handleSubmit}>
        <input type="checkbox" name='newUser' id='newUser' onClick={() => setIsNewUser(!isNewUser)} />
        <label htmlFor="newUser">New User</label>
        <br />
        {isNewUser && <input type="name" name='name' required onBlur={handleBlur} placeholder='Enter your name' />}
        <br />
        <input type="email" name='email' required onBlur={handleBlur} placeholder='Enter your email' />
        <br />
        <input type="password" name="password" id="" required onBlur={handleBlur} placeholder='Enter your password' />
        <br />
        <input type="submit" value={!isNewUser ? 'Sign in' : 'Sign up'} />
      </form>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>Sign{isNewUser ? ' up ' : ' in '}Successful</p>
      }
    </div>
  );
}

export default Login;
