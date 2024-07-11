import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'gatsby';

import { Post } from '@/constants/interfaces';

export default function Home() {
  const [state, setState] = useState<Array<Post>>([]);

  useEffect(() => {
    axios
      .get(`/api/getPosts`)
      .then((res) => setState(res?.data))
      .catch((err) => console.log(`error: `, err));
  }, []);

  const allComments: Array<Post> = [];

  state &&
    state.forEach((post) => {
      const traversePost = (thread: Post) => {
        allComments.push(thread);
        if (thread?.replies) {
          thread.replies.forEach((rep) => traversePost(rep));
        }
      };
      traversePost(post);
    });
  console.log(allComments);

  return (
    <main>
      <Link to="/HowTo">How To</Link>
    </main>
  );
}
