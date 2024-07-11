import React from 'react';

type ArticleSectionProps = {
  children: React.ReactNode;
};

export default function ArticleSection({ children }: ArticleSectionProps) {
  return (
    <section className="w-9/12">
      <article className="bg-white rounded-lg shadow-md p-6">
        {/* Article content goes here */}
        {children}
      </article>
    </section>
  );
}
