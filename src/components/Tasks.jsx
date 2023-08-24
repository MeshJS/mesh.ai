import { Container } from '@/components/Container'

const tasks = [
  {
    title: '✅ Integration Of LLM With Discord Part 1',
    desc: 'This would involve connecting the LLM to the Discord API, allowing it to be used on multiple Discord servers within the Cardano and SingularityNET ecosystem.',
  },
  {
    title: '✅ Build Data Pipeline At Backend',
    desc: 'Chat messages deem as potential training data are collected and organized',
  },
  {
    title: '✅ Build ML Ops Pipeline Part 1',
    desc: 'From data to training data to model training.',
  },
  {
    title: '✅ Training The Model',
    desc: 'The LLM would need to be trained on Cardano and SingularityNET-related topics using data from Discord chats. This would involve collecting and pre-processing the data, and then using it to train the model. Note that this is ongoing process and this work will last as long as the service is up.',
  },
  {
    title: '✅ Build ML Ops Pipeline Part 2',
    desc: 'From model training to response serving',
  },
  {
    title: '✅ Integration Of ChatGPT With Discord Part 2',
    desc: 'For serving responses and collecting data feedback.',
  },
  {
    title: '✅ Testing And Debugging',
    desc: 'The integration would need to be thoroughly tested and any bugs or issues would need to be identified and fixed. Note that this is ongoing process and this work will last as long as the service is up.',
  },
  {
    title: '✅ Deployment',
    desc: 'Once the integration has been tested and debugged, it can be deployed to the Discord servers where it will be used',
  },
  {
    title: '✅ User Documentation And Training',
    desc: 'Detailed documentation and user guides would need to be created to help community members understand how to use the service, and training would need to be provided to help community members get the most out of the service.',
  },
  {
    title: 'Maintenance And Support',
    desc: 'After the service is launched, it will need to be maintained and supported to ensure that it continues to function properly and to address any issues that arise.',
  },
  {
    title: 'Monitor And Measure Performance',
    desc: 'Regular monitoring of the service performance and usage is important to measure the success of the service and make any necessary adjustments.',
  },
]

export function Tasks() {
  return (
    <section
      id="roadmap"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Container className="relative my-16">
        <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
          <h2 className="font-display text-3xl tracking-tight text-black sm:text-4xl md:text-5xl">
            Implementation Roadmap
          </h2>
          <p className="mt-6 text-lg tracking-tight text-blue-900">
            The current state of development of the Mesh AI is as follows
          </p>
        </div>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tasks.map((task, i) => (
                      <tr key={i}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {task.title}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {task.desc}
                        </td>
                        {/* <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.email}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {person.role}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {person.name}</span>
                        </a>
                      </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
