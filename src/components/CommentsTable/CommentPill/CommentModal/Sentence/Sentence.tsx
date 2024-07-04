import { useState } from 'react';
import { Sentence as SentenceType } from '@/constants/interfaces';

type SentenceProps = {
  sentence: SentenceType;
};
export default function Sentence({ sentence }: SentenceProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const score = sentence?.sentiment?.score || 0;
  const magnitude = sentence?.sentiment?.magnitude || 0;
  const fontWeight = magnitude * 900;
  return (
    <>
      <span
        className="inline-block w-fit"
        onMouseOver={() => setShowTooltip(true)}
        onMouseOut={() => setShowTooltip(false)}
        style={{
          backgroundColor: score > 0 ? `green` : `red`,
          filter: `saturate(${Math.abs(score) * 100}%)`,
          fontWeight,
          color: `white`,
        }}
      >
        {sentence?.text?.content}
      </span>
      {showTooltip && (
        <div className="absolute inline-block z-10 top-2 left-4 inline-block px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700">
          <span>
            Score: {score} Magnitude: {magnitude}
          </span>
        </div>
      )}
    </>
  );
}
