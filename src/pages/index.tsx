import Title from '@/components/Title';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Post } from '@/constants/interfaces';

import Comment from '@/components/Comment';

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
            return <Comment key={i} post={post} nested={0}></Comment>;
          })}
      </div>
    </main>
  );
}
