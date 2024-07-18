import { FlatPost } from '@/constants/interfaces';
import Modal from 'react-modal';
import Sentence from './Sentence/Sentence';
import { v4 as uuidv4 } from 'uuid';

type CommentModalProps = {
  isOpen: boolean;
  post: FlatPost;
  setIsOpen: Function;
};

Modal.setAppElement(`#___gatsby`);

export default function CommentModal({
  isOpen,
  setIsOpen,
  post,
}: CommentModalProps) {
  function afterOpenModal() {}

  function closeModal() {
    setIsOpen(false);
  }

  const roundDigit = (num: number) => {
    return Math.round(num * 10000) / 10000;
  };

  const sentenceArr = post?.result?.sentences || [];
  const documentSentiment = post?.result?.documentSentiment;
  const postedAt = new Date(post.postedAtMS).toLocaleString();
  const upvotes = post?.upvotes;
  const downvotes = post?.downvotes;
  const author = post?.author;

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button className="text-2xl font-bold" onClick={() => closeModal()}>
          X
        </button>

        <div>
          {sentenceArr.length > 0 && (
            <div>
              {sentenceArr.map((sentence) => {
                return <Sentence key={uuidv4()} sentence={sentence} />;
              })}
            </div>
          )}
        </div>
        <p>
          Document Sentiment: {roundDigit(documentSentiment?.score || 0)} |
          Document Magnitude: {roundDigit(documentSentiment?.magnitude || 0)}
        </p>
        <p>
          Upvotes: {upvotes} | Downvotes: {downvotes}
        </p>
        <p>Author: {author}</p>
        <p>Posted: {postedAt}</p>
        <div>
          {sentenceArr.map((sentence, i) => {
            return (
              <div key={uuidv4()}>
                <div>
                  Sentence {i + 1} Text:{` `}
                  <Sentence key={uuidv4()} sentence={sentence} />
                </div>
                <p>
                  <span>Score: {roundDigit(sentence.sentiment.score)} </span>
                  <span>
                    Magnitude: {roundDigit(sentence.sentiment.magnitude)}
                    {` `}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
