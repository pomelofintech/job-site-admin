import { query, collection, getFirestore, where, orderBy, onSnapshot, collectionGroup } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import Image from 'next/image'


export default function JobCardFeed({ posts }) {
  const uid = auth.currentUser.uid;
  let [pItem, setpostItem] = useState(null);


  useEffect(() => {
    const q = query(
      collectionGroup(getFirestore(), "clientTest"),
      where("live", "==", false),
      orderBy("addedAt")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newItems = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setpostItem(newItems);
    });
    return unsubscribe;
  }, [getFirestore(), uid]);

  return posts
    ? posts.map((post) => <PostItem post={post} key={post.slug} />)
    : null;

    
}

function PostItem({ post }) {
  // Navive method to calculate word count and read time

  return (
    <div className="ais-Hits-item">

    <div className="search-page-view">
      <a className="select-role" onClick={() => console.log("test")}>
        <div className="parent">
          <div className="div1">
            <img src={post.avatar || post.logo} alt="Company Logo"/>
          </div>
          <div className="div3">{post.jobTitle}</div>
          <div className="div4"> {post.company}</div>
          <div className="div5"> London, UK</div>
          <div className="div6"> XX applicants</div>
          <div className="div7">
            <a onClick={null} style={{ cursor: "pointer" }}>
              <i className="material-icons">favorite</i>
            </a>
          </div>
        </div>
      </a>
    </div>
    </div>
  );
}
