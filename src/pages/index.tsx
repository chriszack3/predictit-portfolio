import { Link } from 'gatsby';
import ArticleSection from '@/components/ArticleSection/ArticleSection';

export default function Home() {
  return (
    <main>
      <ArticleSection>
        <h1 className="text-4xl font-bold mb-4">
          Analysis of a PredictIt.org Comment Section
        </h1>
        <h2 className="text-lg text-gray-600 mb-8">
          Utilizing web-Scraping, large language models, and popular front-end
          libraries to programatically collect, analyze, and visualize data
          about a political futures market.
        </h2>
        <p>
          PredictIt.org is a political futures market where users can buy and
          sell shares of political events. The price of a share ranges from
          $00.01 to $00.99. This can also be seen as corresponding to the
          percieved likilihood of an event occuring. Notably, there is a comment
          section associated with every market. I wrote a program to scrape the
          comments from a given PredictIt market. Click "How To" to see the code
          and learn how to write your own. Click "Comments Visualization" to see
          the comments from a given market scored by Google's Natural Language
          API on their positive or negative sentiment, graphed by number of
          replies per 24 hour cycle of a selected date, and shown below in a
          shade of red, grey, or green to indicate relative level of negative,
          neutral, or positive sentiment respectively. Each comment can be
          clicked on and a more detailed analysis shown.
        </p>
        <div className="flex gap-2">
          <Link to="/HowTo" className="text-blue-500 underline">
            How To Scrape Your Own Comments
          </Link>
          <span>||</span>
          <Link to="/Comments" className="text-blue-500 underline">
            Comments Visualization
          </Link>
        </div>
      </ArticleSection>
    </main>
  );
}
