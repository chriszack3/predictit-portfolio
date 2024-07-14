import { FlatPost } from '@/constants/interfaces';
import { useState } from 'react';
import CommentModal from './CommentModal/CommentModal';

export default function CommentPill({ comment }: { comment: FlatPost }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  const { content } = comment;
  const docScore = comment?.result?.documentSentiment?.score || 0;
  const docMagnitude = comment?.result?.documentSentiment?.magnitude || 0;
  const fontWeight = docMagnitude * 900;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-12 h-12"
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
          {content}
        </p>
      </button>
      <span className="absolute">
        <CommentModal
          post={comment}
          isOpen={modalIsOpen}
          setIsOpen={setIsOpen}
        />
      </span>
    </>
  );
}
