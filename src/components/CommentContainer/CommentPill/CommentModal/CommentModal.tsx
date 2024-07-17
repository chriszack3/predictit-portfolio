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

  const sentenceArr = post?.result?.sentences || [];
  const documentSentiment = post?.result?.documentSentiment;
  const postedAt = new Date(post.postedAtMS).toLocaleString();
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={() => closeModal()}>X</button>

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
          Document Sentiment: {documentSentiment?.score} | Document Magnitude:
          {` `}
          {documentSentiment?.magnitude}
        </p>
        <p>Posted: {postedAt}</p>
        <div>
          {sentenceArr.map((sentence, i) => {
            return (
              <div key={uuidv4()}>
                <p>
                  Sentence {i + 1} Text: {sentence.text.content}
                </p>
                <p>
                  <span>Score: {sentence.sentiment.score} </span>
                  <span>Magnitude: {sentence.sentiment.magnitude} </span>
                </p>
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}
