import React, { useEffect, useState } from "react";
import AuthCheck from "../../components/AuthCheck";
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  collectionGroup,
} from "firebase/firestore";
import { auth } from "../../lib/firebase";
import JobCardFeed from "../../components/JobCardFeed";
import { useRouter } from "next/router";


export default function Favourites() {
  return (
    <AuthCheck>
      <LiveRoles />
      <LiveRolesList />
    </AuthCheck>
  );
}

function LiveRoles() {
  const updateMarketingPref = async (e) => {
    const uid = auth.currentUser.uid;
    console.log(uid);

    const ref = doc(getFirestore(), "users", uid);

    await updateDoc(ref, {
      marketingPref: e.value,
    });

  };

  return (
    <div id="" className="settings_page min_view">
      <div className="fXgiup block">
        <h2 className="settings-title">Jobs to be reviewed</h2>
        {/* <button onClick={testNew}>testNew</button> */}
      </div>
    </div>
  );
}

function LiveRolesList() {
  let [pItem, setpostItem] = useState(null);
  const uid = auth.currentUser.uid;
  console.log(uid);

  const t = async () => {
    const q = query(
      collectionGroup(getFirestore(), "clientTest"),
      where("reviewed", "==", true),
      where("published", "==", true),
      orderBy("addedAt")
    );

    console.log(q);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newItems = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setpostItem(newItems);
    });
    return unsubscribe;
  };
  useEffect(() => {t();}, []);

  return (
    <div className="search-page-view">
      <div className="ais-Hits">
        <div className="ais-Hits-list">
          <JobCardFeed posts={pItem} />
        </div>
      </div>
    </div>
  );
}
