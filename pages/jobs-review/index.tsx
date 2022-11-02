import { firestore, postToJSON } from '../../lib/firebase';
import { Timestamp, query, where, orderBy, limit, collectionGroup, getDocs, startAfter, getFirestore } from 'firebase/firestore';
import { useState } from 'react';
import PostFeed from '../../components/JobPostFeed';
import Loader from '../../components/Loader';
import { getStorage, ref, updateMetadata } from '@firebase/storage';

 

// Max post to query per page
const LIMIT = 2;


export default function Home(props) {

  // We set state on the component incase we want to featch additional posts later
  const [posts, setPosts] = useState(props.posts);
  // state for loading
  const [loading, setLoading] = useState(false);
  // state for reaching the lend of the list
  const [postsEnd, setPostsEnd] = useState(false);

// used to load more posts from the database
const getMorePosts = async () => {
  setLoading(true);
  const last = posts[posts.length - 1];

  // converts the timestamp
  const cursor = typeof last.createdAt === 'number' ? Timestamp.fromMillis(last.createdAt) : last.createdAt;

  // get the posts by in a timestap desending order
  const ref = collectionGroup(getFirestore(), 'posts');
  const postsQuery = query(
    ref,
    where('published', '==', true),
    orderBy('createdAt', 'desc'),
    startAfter(cursor),
    limit(LIMIT),
  );

  // get the data and maps it to the posts component
  const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());

  setPosts(posts.concat(newPosts));
  setLoading(false);

  // check if posts is at its LIMIT
  if (newPosts.length < LIMIT) {
    setPostsEnd(true);
  }

}

  return (
    <>
    <main>

      <div className="card card-info">
        <h2>💡 Next.js + Firebase - The Full Course</h2>
        <p>Welcome! This app is built with Next.js and Firebase and is loosely inspired by Dev.to.</p>
        <p>Sign up for an 👨‍🎤 account, ✍️ write posts, then 💞 heart content created by other users. All public content is server-rendered and search-engine optimized.</p>
      </div>

      <PostFeed posts={posts} admin={false} />

      {/* used as part of the loading and button to show more posts */}
      {/* {!loading && !postsEnd && <button onClick={getMorePosts}>Load More</button>} */}

      {/* loading components */}
      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
    </main>

</>
  );
}

/*
******* LINK COMPONENT *******

import Link from 'next/link'
Creating hyperlinks is done using the link component
<Link href="harry"><a> Harry's profile</a></Link>
Links to a new page by the component name

You can be really specific with links if you add in the pathname and the query parameters
<Link href={{
  pathname: '/[username]'
  query: { username: 'harry' },
}}><a> Harry's profile</a> </Link>

Next will also try to prefetch any links in this component to make the site quicker
this can be done using the prefetch parameter, it is a bool
<Link prefetch={true} href="harry"><a> Harry's profile</a></Link>
*/
