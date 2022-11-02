import { auth, firestore, googleAuthProvider } from "../../lib/firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState, useContext } from "react";
import { UserContext } from "../../lib/context";
import Metatags from "../../components/Metatags";
import { useRouter } from "next/router";
import Dashboard from "../dashboard";

export default function Login() {
  // Used to get the user context values from the logged in user
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />

  return (
    <main>
      <Metatags title="Login" description="Sign up for this amazing app!" />
      {user ? <Dashboard /> : <LoginUserButton />}
    </main>
  );
}

function LoginUserButton() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginSumbit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        return setError("Email and password do not match");
      } else {
        return setError("Oops something went wrong, please try again");
      }
    }
  };

  return (
    <div>
      <div className="flex-grow">
        <div className="qstaire-header">
          <h3>Login to Pursue</h3>
          <br />
          <p>Job Portal</p>
        </div>
        <div className="qstaire-seperate-div">
          <div className="qstaire-outer-div">
            <div className="qstaire-inner-div">
              <div className="sc-cfWELz eHIaoM">
                <div>
                  <form onSubmit={loginSumbit}>
                    <div className="jBUQajq field">
                      <label htmlFor="email" className="gNTSvw question">
                        Email
                      </label>
                      <div className="cqMAuL">
                        <input
                          // defaultValue={doc.email}
                          id="email"
                          name="email"
                          type="text"
                          className="sc-bkzYnD SDDHw"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="jBUQajq field">
                      <label htmlFor="email" className="gNTSvw question">
                        Password
                      </label>
                      <div className="cqMAuL">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          className="sc-bkzYnD SDDHw"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      className="btn-std-nav-size ft-btn-next ft-btn-next-flx"
                      type="submit"
                      onClick={loginSumbit}
                    >
                      Let&apos;s go
                    </button>
                  </form>
                  <div>
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// // // Sign out button
// function SignOutButton() {
//   const router = useRouter();
//   const { user, username } = useContext(UserContext);

//   const signOutNow = () => {
//     console.log(user.uid);
//     signOut(auth);
//     router.reload();
//   };
//   return (
//     <div>
//       <button
//         className="btn-std-nav-size ft-btn-next ft-btn-next-flx"
//         type="submit"
//         onClick={signOutNow}
//       >
//         Sign out
//       </button>
//     </div>
//   );
// }

