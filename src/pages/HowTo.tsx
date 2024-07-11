/* eslint-disable no-useless-escape */
import ArticleSection from '@/components/ArticleSection/ArticleSection';

const pupFileText = `/*app.mjs*/
import puppeteer from 'puppeteer';
(async () => {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.google.com/');
    console.log(await page.content());
    await browser.close();
})();`;

const tsConfigText = `/*tsconfig.json*/
{
    "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "target": "es6",
        "noImplicitAny": true,
        "moduleResolution": "Node",
        "skipLibCheck": true,
        "sourceMap": true,
        "strict": true,
        "baseUrl": ".",
        "paths": {
            "@/*": [
                "app.ts"
            ]
        }
    },
    "exclude": [
        "node_modules"
    ],
    "include": [
        "app.ts"
    ]
}`;

const packageJsonText = `/*package.json*/
{
  "dependencies": {
    "puppeteer": "^22.12.1"
  },
  "devDependencies": {
    "typescript": "^5.5.3"
  },
  "scripts": {
    "start": "npx tsc && node app.js"
  }
}`;

const dataShapeText = `interface Post {
    id: string;
    author: string;
    content: string;
    downvotes: string;
    upvotes: string;
    postedAtMS: number;
    parentPost?: Post["id"];
    replies?: Array<Post["id"]>;
}
`;
const getThreadsPupText = `/*app.ts*/
import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    //navigate to the page
    await page.goto('https://disqus.com/embed/comments/?base=default&f=predictit&t_i=8069&t_u=https%3A%2F%2Fwww.predictit.org%2Fmarkets%2Fdetail%2F8069%2FWho-will-win-the-2024-Republican-vice-presidential-nomination&t_e=PredictIt%20%7C%20Who%20will%20win%20the%202024%20Republican%20vice%20presidential%20nomination%3F&t_d=%20Who%20will%20win%20the%202024%20Republican%20vice%20presidential%20nomination%3F%0A%20%20%20%20%20%20&t_t=PredictIt%20%7C%20Who%20will%20win%20the%202024%20Republican%20vice%20presidential%20nomination%3F&s_o=default#version=6c27b7b2e58aef7c0a19eb6da9bdf7b0');
    //wait for the page to stop actively loading
    await page.waitForNetworkIdle()
    //confirm our elements are loaded
    await page.waitForSelector('ul.post-list > .post');
    //querySelectorAll for ul.post-list > .post, passed to callback as postsArray
    const response = await page.$$eval('ul.post-list > .post', (postsArray) => {
        //map over postsArray IN THE BROWSER'S CONTEXT
        const postMap = postsArray.map((post) => {
            //getNestedThread is a recursive function that will return the posts in a thread while preserving the deeply nested structure
            function getNestedThread (post: Element) {
                const content = post.querySelector('div.post-content > div.post-body > div.post-body-inner > div.post-message-container > div.publisher-anchor-color > div.post-message')?.textContent
                const author = post.querySelector('.author > a')?.textContent
                const upvotes = post.querySelector('a.vote-up > span.count')?.textContent
                const downvotes = post.querySelector('a.vote-down > span.count')?.textContent
                const timeEl = post.querySelector('div.post-content > div.post-body > header.comment__header > span > a.time-ago')?.getAttribute('title') || ''
                const postedAtMS = Date.parse(timeEl)
                const childContainer = post.querySelector('div.children > ul')?.children || []
                const children = Array.from(childContainer)
                const replies: Array<Object> = children.length > 0 ? children.map((child) => {
                    return getNestedThread(child)
                }) : []
                return { content, author, upvotes, downvotes, postedAtMS, replies }
            }
            //return the result of getNestedThread for each Element in postsArray
            return getNestedThread(post)
        })
        return postMap
    })
    //log the response in OUR Node's context
    console.log(response)

    await browser.close();
})();
`;
const flattenText = `/*app.ts*/
import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

interface FlatPost {
    id: string;
    author: string;
    content: string;
    downvotes: string;
    upvotes: string;
    postedAtMS: number;
    replies?: Array<FlatPost["id"]>;
    parentPost?: FlatPost["id"];
}

const runScrape = async () => {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    //navigate to the page
    await page.goto('https://disqus.com/embed/comments/?base=default&f=predictit&t_i=8069&t_u=https%3A%2F%2Fwww.predictit.org%2Fmarkets%2Fdetail%2F8069%2FWho-will-win-the-2024-Republican-vice-presidential-nomination&t_e=PredictIt%20%7C%20Who%20will%20win%20the%202024%20Republican%20vice%20presidential%20nomination%3F&t_d=%20Who%20will%20win%20the%202024%20Republican%20vice%20presidential%20nomination%3F%0A%20%20%20%20%20%20&t_t=PredictIt%20%7C%20Who%20will%20win%20the%202024%20Republican%20vice%20presidential%20nomination%3F&s_o=default#version=6c27b7b2e58aef7c0a19eb6da9bdf7b0');
    //wait for the page to stop actively loading
    await page.waitForNetworkIdle()
    //confirm our elements are loaded
    await page.waitForSelector('ul.post-list > .post');
    //querySelectorAll for ul.post-list > .post, passed to callback as postsArray
    const response = await page.$$eval('ul.post-list > .post', (postsArray) => {
        //map over postsArray IN THE BROWSER'S CONTEXT
        const postMap = postsArray.map((post) => {
            //getNestedThread is a recursive function that will return the posts in a thread while preserving the deeply nested structure
            function getNestedThread(post: Element) {
                const content = post.querySelector('div.post-content > div.post-body > div.post-body-inner > div.post-message-container > div.publisher-anchor-color > div.post-message')?.textContent || ''
                const author = post.querySelector('.author > a')?.textContent || ''
                const upvotes = post.querySelector('a.vote-up > span.count')?.textContent || ''
                const downvotes = post.querySelector('a.vote-down > span.count')?.textContent || ''
                const timeEl = post.querySelector('div.post-content > div.post-body > header.comment__header > span > a.time-ago')?.getAttribute('title') || ''
                const postedAtMS = Date.parse(timeEl)
                const childContainer = post.querySelector('div.children > ul')?.children || []
                const children = Array.from(childContainer)
                const replies: Array<Object> = children.length > 0 ? children.map((child) => {
                    return getNestedThread(child)
                }) : []
                return { content, author, upvotes, downvotes, postedAtMS, replies }
            }
            //return the result of getNestedThread for each Element in postsArray
            return getNestedThread(post)
        })
        return postMap
    })

    await browser.close();

    return response
}

(async () => {
    //run the scrape function
    const response = await runScrape()
    //initialize an array to hold the flattened posts
    let flatPosts: Array<FlatPost> = []
    //recursive function to add properties to the post object and push to flatPosts
    const addProperties = (obj: any, propObj: any) => {
        //add the properties from propObj to obj
        Object.assign(obj, propObj)
        //push the obj to flatPosts
        flatPosts.push(obj)
        //if the obj has replies, call addProperties on each reply
        if (obj?.replies) {
            //id of parent post to each reply obj
            const parentId = obj.id
            //add parentId to each reply obj
            obj?.replies.forEach((reply: any) => {
                addProperties(reply, { parentId: parentId, id: uuidv4() })
            })
            //add array of reply ids to parent post obj
            Object.assign(obj, { children: obj.replies.map((reply: any) => reply.id) })
            //flatten the replies array
            flatPosts = flatPosts.concat(obj.replies)
        }
    }
    //call addProperties on each thread in the response array
    response.forEach((post) => {
        addProperties(post, { id: uuidv4() })
    })
    //delete the replies property from each post
    flatPosts.forEach((post) => {
        delete post.replies
    })
    fs.writeFileSync('flatPosts.json', JSON.stringify(flatPosts))
})()
`;

const loadAllText = `/*app.ts*/
import puppeteer from 'puppeteer';
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

interface FlatPost {
    id: string;
    author: string;
    content: string;
    downvotes: string;
    upvotes: string;
    postedAtMS: number;
    replies?: Array<FlatPost["id"]>;
    parentPost?: FlatPost["id"];
}

const runScrape = async () => {
    const browser = await puppeteer.launch({ headless: false});
    const page = await browser.newPage();
    //navigate to the page
    await page.goto('https://disqus.com/embed/comments/?base=default&f=predictit&t_i=8069&t_u=https%3A%2F%2Fwww.predictit.org%2Fmarkets%2Fdetail%2F8069%2FWho-will-win-the-2024-Republican-vice-presidential-nomination&t_e=PredictIt%20%7C%20Who%20will%20win%20the%202024%20Republican%20vice%20presidential%20nomination%3F&t_d=%20Who%20will%20win%20the%202024%20Republican%20vice%20presidential%20nomination%3F%0A%20%20%20%20%20%20&t_t=PredictIt%20%7C%20Who%20will%20win%20the%202024%20Republican%20vice%20presidential%20nomination%3F&s_o=default#version=6c27b7b2e58aef7c0a19eb6da9bdf7b0');
    //wait for the page to stop actively loading
    await page.waitForNetworkIdle()
    //wait for the load more button to appear
    await page.waitForSelector('a.load-more-refresh__button')
    let loadMore = true
    while (loadMore) {
        try {
            //if the load more button is present, click it and wait for the page to stop actively loading
            await page.waitForSelector('a.load-more-refresh__button', { timeout: 5000 })
            //if no element is found, functions will throw error
            await page.click('a.load-more-refresh__button')
            await page.waitForNetworkIdle()
        } catch (err) {
            //catch error, break loop
            break
        }
    }
    //confirm our elements are loaded
    await page.waitForSelector('ul.post-list > .post');
    //querySelectorAll for ul.post-list > .post, passed to callback as postsArray
    const response = await page.$$eval('ul.post-list > .post', (postsArray) => {
        //map over postsArray IN THE BROWSER'S CONTEXT
        const postMap = postsArray.map((post) => {
            //getNestedThread is a recursive function that will return the posts in a thread while preserving the deeply nested structure
            function getNestedThread(post: Element) {
                const content = post.querySelector('div.post-content > div.post-body > div.post-body-inner > div.post-message-container > div.publisher-anchor-color > div.post-message')?.textContent || ''
                const author = post.querySelector('.author > a')?.textContent || ''
                const upvotes = post.querySelector('a.vote-up > span.count')?.textContent || ''
                const downvotes = post.querySelector('a.vote-down > span.count')?.textContent || ''
                const timeEl = post.querySelector('div.post-content > div.post-body > header.comment__header > span > a.time-ago')?.getAttribute('title') || ''
                const postedAtMS = Date.parse(timeEl)
                const childContainer = post.querySelector('div.children > ul')?.children || []
                const children = Array.from(childContainer)
                const replies: Array<Object> = children.length > 0 ? children.map((child) => {
                    return getNestedThread(child)
                }) : []
                return { content, author, upvotes, downvotes, postedAtMS, replies }
            }
            //return the result of getNestedThread for each Element in postsArray
            return getNestedThread(post)
        })
        return postMap
    })

    await browser.close();

    return response
}

(async () => {
    //run the scrape function
    const response = await runScrape()
    //initialize an array to hold the flattened posts
    let flatPosts: Array<FlatPost> = []
    //recursive function to add properties to the post object and push to flatPosts
    const addProperties = (obj: any, propObj: any) => {
        //add the properties from propObj to obj
        Object.assign(obj, propObj)
        //push the obj to flatPosts
        flatPosts.push(obj)
        //if the obj has replies, call addProperties on each reply
        if (obj?.replies) {
            //id of parent post to each reply obj
            const parentId = obj.id
            //add parentId to each reply obj
            obj?.replies.forEach((reply: any) => {
                addProperties(reply, { parentId: parentId, id: uuidv4() })
            })
            //add array of reply ids to parent post obj
            Object.assign(obj, { children: obj.replies.map((reply: any) => reply.id) })
            //flatten the replies array
            flatPosts = flatPosts.concat(obj.replies)
        }
    }
    //call addProperties on each thread in the response array
    response.forEach((post) => {
        addProperties(post, { id: uuidv4() })
    })
    //delete the replies property from each post
    flatPosts.forEach((post) => {
        delete post.replies
    })
    fs.writeFileSync('flatPosts.json', JSON.stringify(flatPosts))
})()
`;

const FileCode = ({ codeText }: { codeText: string }) => {
  return (
    <div
      className="
        bg-black
        text-white
        w-fit
        max-w-full
        p-4
        mb-4
        rounded-lg
        overflow-scroll
      "
    >
      <code className="w-fit rounded-lg whitespace-pre">{codeText}</code>
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <ArticleSection>
        <h1 className="text-3xl font-bold mb-4 text-center">
          How to Scrape Nested Comments using Puppeteer
        </h1>
        <p className="mb-4">
          <span className="font-bold">Objective: </span>Scrape and maintain
          nested structure of comments from PredictIt.org's third-party comment
          service Disqus
        </p>
        <p className="mb-4">
          <span className="font-bold">Technologies: </span>Puppeteer.js,
          TypeScript, JavaScript
        </p>
        <header className="text-xl font-bold mb-4">Overview</header>
        <p className="mb-4">
          This project utilizes Puppeteer, a Node.js library that provides a
          high-level API to control headless Chrome or Chromium over the
          DevTools Protocol.
        </p>
        <header className="text-xl font-bold mb-4">Getting Started</header>
        <p className="mb-4">
          This summary will assume a basic understanding of Node, NPM,
          JavaScript and TypeScript.
        </p>
        <ol className="list-decimal ml-8">
          <li>
            Verify you are using a relatively recent version of Node (I built
            this with v18.13.0, but {`>`}= v14.21.3 should be fine)
          </li>
          <div className="mb-2">
            <p>
              To check your version of Node, run the following command in your
              terminal:
            </p>
            <code className="bg-gray-200 p-2 rounded-lg">$ node -v</code>
          </div>
          <li className="mb-2">Install the Puppeteer library</li>
          <div className="mb-2">
            <p>
              To install Puppeteer, run the following command in your terminal:
            </p>
            <code className="bg-gray-200 p-2 rounded-lg">
              $ npm install puppeteer
            </code>
          </div>
          <li className="mb-2">Verify Puppeteer & Chromium installation</li>
          <div className="mb-2">
            <p>
              To verify Puppeteer installed itself and its dependencies
              correctly, create a new file named "app.mjs" (we are using the
              module file extension so that we can leverage ES6's top-level
              await out of the box, but the extension will be changed to support
              TypeScript in an upcoming section.) in your project directory, add
              the following code, and save:
            </p>
            <FileCode codeText={pupFileText} />
            <p>Then, run the following command in your terminal:</p>
            <code className="bg-gray-200 p-2 rounded-lg">$ node app.mjs</code>
            <p>
              You should very briefly see a new instance of chrome open,
              navigate to google.com, and then close. In your console you should
              see the HTML content of google.com. If you see this, you have
              successfully installed Puppeteer and are ready to move on to the
              next section.
            </p>
          </div>
          <li className="mb-2">Configure TypeScript</li>
          <div className="mb-2">
            <p>
              In the next step we will use TypeScript to define the shape of the
              data to be scraped, so first we need to install and configure
              TypeScript for our project. Run the following command in your
              terminal to install TypeScript:
            </p>
            <code className="bg-gray-200 p-2 rounded-lg">
              $ npm install -D typescript
            </code>
            <p>
              The last thing to do is change the file name from "app.mjs" to
              "app.ts" and then configure TypeScript for the project. Create a
              new file named "tsconfig.json" in your project directory and add
              the following code:
            </p>
            <FileCode codeText={tsConfigText} />
            <p>
              Now we can transpile the application to JavaScript and run that
              file in Node, but it will take two commands to do so which becomes
              cumbersome. To streamline this process all we need to do is add a
              script to our package.json file. Open package.json and add the
              following code to the "scripts" object:
            </p>
            <code className="bg-gray-200 p-2 rounded-lg">
              "start": "tsc && node app.js"
            </code>
            <p>Your package.json file should now look something like this:</p>
            <FileCode codeText={packageJsonText} />
            <p>Now, when you run the following command in your terminal:</p>
            <code className="bg-gray-200 p-2 rounded-lg">$ npm start</code>
            <p>
              You should see the same behavior as before except for the
              outputted files in your project root. Now, app.ts is being
              transpiled to JavaScript, allowing you to leverage TypeScript's
              type-checking and other features, before being run in Node.
            </p>
          </div>
          <li className="mb-2">Define the shape of data</li>
          <div className="mb-2">
            <p>
              Before we start scraping, we need to define the shape of the data
              we want to return from the scrape. This can feel a bit like
              shopping for furniture before the house is built, but is actually
              more akin to blueprinting the house before building it. In this
              case, we are looking at the comments section of a given market, so
              the data we want to capture is pretty straightforward: author,
              content, upvotes, downvotes, time posted, and the tricky one--
              replies(but we will come back to this). We are going to add the
              following code to our app.ts file:
            </p>
            <FileCode codeText={dataShapeText} />
            <p>
              Three properties to note before moving on are the "id" property,
              the parentPost property, and the replies property. The "id"
              property is a unique identifier for each comment and will be
              generated with the uuid library which is why it wasn't included in
              the "data to scrape" list. The "parentPost" property is the id of
              the post that the comment is replying to. The "replies" property
              is an array of ids of posts that are in reply to the comment. This
              will allow us to maintain the nested structure of the comments
              section, while also allowing us to flatten the data for analysis
              and visualization.
            </p>
          </div>
          <li className="mb-2">Prepare to scrape</li>
          <div className="mb-2">
            <p>
              PredictIt.org uses a third-party commenting system, called Disqus,
              that is embedded in each market page. Instead of scraping the
              PredictIt.org page directly, we will scrape the Disqus page for
              each market. Eventually we will scrape the link for the Disqus
              page from the PredictIt.org page, but for now we will hardcode the
              link. To find the link scroll to the bottom of the targeted market
              page and right click anywhere on the comments section, then click
              "inspect". Scroll up in the elements tab until you see an iframe
              tag with a src attribute that looks like this:
            </p>
            <p>https://disqus.com/embed/comments/LINK_TO_COMMENT_PAGE</p>
            <p>Or you can use my example link which will be included below.</p>
            <p>
              You'll notice that the Disqus page doesn't load all the comments
              at once, but rather loads them after a "load more comments" button
              is clicked. This means our scraper will need to accomplish two
              things: 1) click the "load more comments" button until all
              comments are loaded, and 2) scrape all the loaded comments. This
              part is mostly down to preference, but I like to start by writing
              the scraping function before the clicking function. This way I can
              test the scraping function in isolation before adding the clicking
              function, but it's up to you. So, now let's write a function that
              scrapes all the comments currently loaded on the page. This leads
              us to our first major design choice: how shoule we handle the
              nested structure of the comments section?
            </p>
            <p>
              We could scrape all the comments and then reconstruct the nested
              structure from data attributes, but that would be more difficult
              to maintain and prone to error if any changes are made to the
              Disqus page. Instead we will scrape the page for each top-level
              comment (a comment that is not a reply), which I will refer to as
              a "thread". Then, we will write a function that takes as an
              argument a comment element, scrapes the data from the original
              comment, calls itself recursively for each of its replies, then
              returns an array of deeply-nested Post objects. For those of you
              paying close attention to the data shape we defined in the last
              section, you may notice at this point that the function I just
              described will not return the data in exactly the shape we
              defined. That's because we will still need to flatten the data
              after we scrape it in its nested form. Ok, now that we have a plan
              in place, it's finally time to scrape some data.
            </p>
          </div>
          <li className="mb-2">Scrape the data</li>
          <div className="mb-2">
            <p>
              To return all loaded threads we will call Puppeteer's .$$eval
              method on the page with two arguments: 1) the CSS selector for the
              queried elements and 2) a callback function that receives an array
              of elements that match the css selector as an argument and
              executes its function body in the <em>browser's</em> Node context.
              This means that the function will not have access to any variables
              or functions in our Node's context, outside of what is contained
              in the callback function. This is why we will define our recursive
              function inside of the callback function. With the new code added
              our app.ts file should look something like this:
            </p>
            <FileCode codeText={getThreadsPupText} />
          </div>
          <li className="mb-2">Transform the data</li>
          <div className="mb-2">
            <p>
              Now that we have our data in its deeply nested form, we need to
              flatten it for analysis and visualization. The first thing we need
              to address is the lack of a unique identifier for each comment. We
              will use the uuid library to generate a unique id for each
              comment. If you are wondering why we didn't create this id when we
              scraped the data, it's because the uuid library is not available
              in the browser's context and exposing it to the browser's context
              is considerably more work than an extra loop in our Node context.
              So let's go ahead and install the uuid library:
            </p>
            <code className="bg-gray-200 p-2 rounded-lg">
              $ npm install uuid && npm install --save-dev @types/uuid
            </code>
            <p>
              I am going to write these functions in the same file as the
              scraping function, but if I was scaling this project I would
              refactor them into different files. Here is the app.ts file after
              adding the uuid library, the flatten function, some comments, and
              writing the result to a JSON file:
            </p>
            <FileCode codeText={flattenText} />
          </div>
          <li className="mb-2">Load All Comments</li>
          <div className="mb-2">
            <p>
              If you recall from the scraping section, we only scraped the
              comments that were loaded on the page when we ran the script. The
              last thing we need to do on the scraping side of things, is to add
              a couple function calls that will instruct our browser instance to
              click the "load more comments" button until all comments are
              loaded. This is a bit more straightforward than the scraping
              function, since Puppeteer provides some helpful API methods for
              interacting with the page. Your app.ts file should now look
              something like this:
            </p>
            <FileCode codeText={loadAllText} />
          </div>
        </ol>
      </ArticleSection>
    </main>
  );
}
