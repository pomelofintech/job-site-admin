import React, { useEffect, useState } from "react";
import AuthCheck from "../../components/AuthCheck";
import {
  getFirestore,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  collectionGroup,
} from "firebase/firestore";
import { auth } from "../../lib/firebase";
import CompanyCardFeed from "../../components/CompanyCardFeed";
import Link from "next/link";
import router from "next/router";


export default function CompanyDetails() {
  return (
    <AuthCheck>
      <CompanyReview />
      <CompanyReviewList />
    </AuthCheck>
  );
}

function CompanyReview() {
  const createNewCompany = async () => {
    router.push(`/company-details/add-new-company`);
  };

  return (
    <div id="" className="settings_page min_view">
      <div className="fXgiup block">
        <h2 className="settings-title">Create / View / Edit a company</h2>
        {/* <button onClick={testNew}>testNew</button> */}
      </div>
            <button className="btn-purple" onClick={() => createNewCompany()}>Create new company </button>
    </div>
  );
}


function CompanyReviewList() {
  let [pItem, setpostItem] = useState(null);
  const uid = auth.currentUser.uid;
  console.log(uid);

  const t = async () => {
    const q = query(
      collectionGroup(getFirestore(), "companyDetails"),
      where("companyCreation", "==", true),
      orderBy("addedAt")
    );

    console.log(q);

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newItems = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log(newItems);
      setpostItem(newItems);
    });
    return unsubscribe;
  };
  useEffect(() => {t();}, []);

  return (
    <div className="search-page-view">
      <div className="ais-Hits">
        <div className="ais-Hits-list">
          <CompanyCardFeed posts={pItem} />
        </div>
      </div>
    </div>
  );
}
