import Title from '@/components/Title';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Post {
  opAuthor: string;
  opContent: string;
  downvotes: string;
  upvotes: string;
  replies: Array<Post>;
}

export default function Home() {
  const [state, setState] = useState<Array<Post>>([]);

  useEffect(() => {
    axios
      .get(`/api/getPosts`)
      .then((res) => setState(res?.data))
      .catch((err) => console.log(`error: `, err));
  }, []);
  return (
    <main>
      <Title>Hello TypeScript!</Title>
      <div>
        {state &&
          state.map((post, i) => {
            console.log(post);
            return (
              <div key={i}>
                <p>{post.opAuthor}</p>
                <p>{post.opContent}</p>
                <p>{post.upvotes}</p>
                <p>{post.downvotes}</p>
              </div>
            );
          })}
      </div>
    </main>
  );
}
