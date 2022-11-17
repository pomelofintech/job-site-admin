import { query, collection, getFirestore, where, orderBy, onSnapshot, collectionGroup } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import Image from 'next/image'
import router from "next/router";


export default function JobCardFeed({ posts }) {
  const uid = auth.currentUser.uid;
  let [pItem, setpostItem] = useState(null);






  // useEffect(() => {
  //   const q = query(
  //     collectionGroup(getFirestore(), "clientTest"),
  //     where("reviewed", "==", false),
  //     orderBy("addedAt")
  //   );

  //   console.log('harry');
  //   console.log(q);

  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const newItems = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     console.log(newItems);
  //     setpostItem(newItems);
  //   });
  //   return unsubscribe;
  // }, [getFirestore()]);

  return posts
    ? posts.map((post) => <PostItem post={post} key={post.slug} />)
    : null;

    
    
}

function PostItem({ post }) {
  // Navive method to calculate word count and read time
  const getNote = async (companyId) => {
    router.push(`/company-details/${companyId}`);
  };

  return (
    <div className="ais-Hits-item">

    <div className="search-page-view">
      <a className="select-role" onClick={() => getNote(post.slug)}>
        <div className="parent">
          <div className="div3">{post.companyName}</div>
          <div className="div4"> {post.city}</div>
        </div>
      </a>
    </div>
    </div>
  );
}
