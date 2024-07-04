import { Post } from '@/constants/interfaces';

type CommentPillProps = {
  post: Post;
};

export default function CommentPill({ post }: CommentPillProps) {
  console.log(post);
  const { opContent } = post;
  const docScore = post?.result?.documentSentiment?.score || 0;
  return (
    <div
      className="w-32 h-12 rounded-lg"
      style={{
        backgroundColor: docScore > 0 ? `green` : `red`,
        filter: `brightness(${Math.abs(docScore)})`,
      }}
    >
      <p className="truncate">{opContent}</p>
    </div>
  );
}

// <React.Fragment>
//     {
//         sentenceArr.length > 0 && (
//             <div>
//                 {sentenceArr.map(sentence => {
//                     console.log(sentence)
//                     return <span>{sentence?.text?.content}</span>
//                 })}
//             </div>
//         )
//     }
// </React.Fragment>
