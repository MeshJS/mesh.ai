import Metatags from "@components/site/Metatags";

export default function Home() {
  return (
    <>
      <Metatags title={`About Mesh AI`} />
      <Page />
    </>
  );
}

function Page() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-lg text-center">
          <h2 className="mb-2 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            About Mesh AI
          </h2>
          <p className="mb-8 text-gray-500 lg:text-lg dark:text-gray-400"></p>
        </div>

        <div className="grid pt-8 text-left border-t border-gray-200 dark:border-gray-700 sm:gap-8 lg:gap-16 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Item title="How does Mesh AI works?">
              <p>
                Each query goes through a few machine learning models, each does
                a specific role.
              </p>
              <p>
                The very first model is tasked to understand your search intent.
                Is it a technical question about Mesh? Is it a question about
                Cardano? Or is it a general question which can be about
                anything?
              </p>
              <p>
                For instance, if the search intend was about Mesh, we will need
                to generate source codes, thumbs we will query the Mesh model.
                If it is a general question, we will aggregate resources, and
                the generate results with the general knowledge model.
              </p>
            </Item>
            <Item title="What is the purpose of Mesh AI?">
              <p>
                Similar to how{" "}
                <a href="https://meshjs.dev/" target="_blank" rel="noreferrer">
                  MeshJS
                </a>
                , is like a well-woven fabric, that interconnects technology
                stacks to make development accessible on Cardano; Mesh AI
                interconnects knowledge that make Cardano contents,
                documentations, and articles accessible.
              </p>
            </Item>
          </div>
          <div>
            <Item title="How you can improve the knowledge base?">
              <ol>
                <li>
                  <b>Log in to Mesh AI</b> and start interacting with others. By
                  logging in, you can thumbs up/down, and participate in
                  discussions. You can also suggest edits for any results (this
                  will be subjected to change when reputation system is up).
                </li>
                <li>
                  <b>Thumbs up and down results</b>. By voting for the results,
                  that filters what goes into machine learning for training
                  data. It also helps in the ranking of results.
                </li>
                <li>
                  <b>Suggest edits</b>. As results are generated, they may not
                  be accurate or well written. You can suggest edits to modify
                  the results. Voting system to accept will be implemented next.
                </li>
                <li>
                  <b>Join in the discussion</b>. Doing so expands the results
                  with more context and added information.
                </li>
              </ol>
            </Item>
            <Item title="There's a problem or have ideas?">
              <p>
                Mesh AI is new, expect it to break at some edge cases. You can
                reach me on{" "}
                <a
                  href="https://twitter.com/jinglescode"
                  target="_blank"
                  rel="noreferrer"
                >
                  Twitter
                </a>
                .
              </p>
            </Item>
          </div>
          <div>
            <Item title="Is it costly to run Mesh AI services?">
              <p>
                The cost scale linearly according to traffic. And yes, machine
                learning tasks, extracting knowledge base, and various API
                services can be costly over time.
              </p>
            </Item>
            <Item title="Is this project funded?">
              <p>
                Currently not funded. This project is developed by{" "}
                <a
                  href="https://twitter.com/jinglescode"
                  target="_blank"
                  rel="noreferrer"
                >
                  Jingles
                </a>
                . You can donate to <code>$jingles</code> or support{" "}
                <a
                  href="https://meshjs.dev/about/support-us"
                  target="_blank"
                  rel="noreferrer"
                >
                  MeshJS
                </a>
                .
              </p>
            </Item>
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ children, title }) {
  return (
    <div className="mb-10 prose">
      <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
        {title}
      </h3>
      <div className="text-gray-500 dark:text-gray-400">{children}</div>
    </div>
  );
}
