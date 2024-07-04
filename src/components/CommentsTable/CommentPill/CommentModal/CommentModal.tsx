import { Post } from '@/constants/interfaces';
import Modal from 'react-modal';
import { v4 as uuidv4 } from 'uuid';

type CommentModalProps = {
  isOpen: boolean;
  post: Post;
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
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>

        <div>
          {sentenceArr.length > 0 && (
            <div>
              {sentenceArr.map((sentence) => {
                const score = sentence?.sentiment?.score || 0;
                const magnitude = sentence?.sentiment?.magnitude || 0;
                const fontWeight = magnitude * 900;
                return (
                  <span
                    key={uuidv4()}
                    style={{
                      backgroundColor: score > 0 ? `green` : `red`,
                      filter: `saturate(${Math.abs(score) * 100}%)`,
                      fontWeight,
                      color: `white`,
                    }}
                  >
                    {sentence?.text?.content}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
