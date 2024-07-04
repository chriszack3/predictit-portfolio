import CommentModal from './CommentModal/CommentModal';
import { useState } from 'react';

import { Post } from '@/constants/interfaces';

type CommentPillProps = {
  post: Post;
};

export default function CommentPill({ post }: CommentPillProps) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const { opContent } = post;
  const docScore = post?.result?.documentSentiment?.score || 0;
  const docMagnitude = post?.result?.documentSentiment?.magnitude || 0;
  const fontWeight = docMagnitude * 900;
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-32 h-12 rounded-lg"
        style={{
          backgroundColor: docScore > 0 ? `green` : `red`,
          filter: `saturate(${Math.abs(docScore) * 100}%)`,
        }}
      >
        <p
          className="truncate"
          style={{
            fontWeight,
            color: `white`,
          }}
        >
          {opContent}
        </p>
      </button>
      <CommentModal post={post} isOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </>
  );
}
