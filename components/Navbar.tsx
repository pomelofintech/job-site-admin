import Link from "next/link";
import { UserContext } from "../lib/context";
import { useContext } from "react";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Navbar(props) {
  // Used to get the user context values from the logged in user
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOutNow = () => {
    signOut(auth);
    router.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-push-left">
        <Link href="/" passHref>
          <button className="btn-logo">Pursue.</button>
        </Link>
      </div>

      {/* user is signed in and has a username */}
      {/* If user does have a username, render a fragment, which is an empty HTML element
                allos for multiple elements but doesnt require a parent element */}
      {user && (
        <div className="navbar-push-right">
          <div>
            <button className="btn-purple" onClick={signOutNow}>
              Logout
            </button>
          </div>
        </div>
      )}

      {/* user is nnot signed in OR has not created a username, directs the user to the sign in page*/}
      {!user && (
        <div className="navbar-push-right">
          <div>
            <Link href="/login" passHref>
              <button className="btn-purple">Log in</button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
