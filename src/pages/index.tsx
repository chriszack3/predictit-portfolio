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
          section associated with every market. I decided to write an
          application that can scrape the comments from a chosen market and
          store them in a way that is easy to analyze. Click "How To" to see the
          source code and read a tutorial on how to build your own. Click
          "Comments Visualization" to interact with a collection of comments I
          scraped from PredictIt.org's "Will Joe Biden be the Democratic Nominee
          on 12/31/2024?" market. You'll see three components on the page: a
          calendar, a bar graph, and a styled list of comments. The calendar
          allows you to select a date and the bar graph displays a count of the
          comments during each hour of the day. The list of comments displays
          the comments that were posted on the selected date and sorted by the
          hour of the day they were posted. Each comment 'pill' is displayed in
          a gradient of red or green to indicate more negative or more positive
          sentiment respectively. Each pill can be clicked to reveal a more
          detailed sentiment analysis of the comment.
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
