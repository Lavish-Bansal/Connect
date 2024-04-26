import { FaCheck } from "react-icons/fa";

const features = [
  {
    name: 'Keep events on schedule',
    description:
      'In order to organize an event, you must log in as an event manager. The platform admin can assign event managers. After logging in, you can begin managing the event.',
  },
  {
    name: 'More speed. High efficiency',
    description: 'You will have your own dashboard. Fill details and schedule your events. Secure and quick access'
  },
  {
    name: 'Register for your favourite event',
    description: 'On users dashboard, users can view all available events, select their preferred event, and proceed with the registration process.'
  },
  {
    name: 'Super easy. Quick registration',
    description: 'Do register for the event. Get all the details about that event. Stay informed about the events you have registered for',
  },
  {
    name: 'Track check-in/check-out',
    description: 'Effortlessly monitor event participants and their details with our platform, and simplify the check-in and check-out process with our convenient features.'
  },
  {
    name: 'Less effort. More work',
    description: 'Automate manual work. Improves the security at venue. Keeping track of all attendees'
  },
];

export default function About() {
  return (
    <div style={{marginTop:"0%"}} className='bg-white'>
      <div className='max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2'>
        <div className='grid grid-cols-2 grid-rows-3 gap-4 sm:gap-6 lg:gap-8'>
          <img
            loading='lazy'
            src='/img/fifthImg.jpeg'
            alt='Walnut card tray with white powder coated steel divider and 3 punchout holes.'
            className='bg-gray-100 rounded-lg h-full'
          />
          <img
            loading='lazy'
            src='/img/sixthImg.jpg'
            alt='Top down view of walnut card tray with embedded magnets and card groove.'
            className='bg-gray-100 rounded-lg h-full'
          />
          <img
            loading='lazy'
            src='/img/fourthImg.jpg'
            className='bg-gray-100 rounded-lg'
          />
          <img
            loading='lazy'
            src='/img/firstImg.jpg'
            className='bg-gray-100 rounded-lg'
          />
          <img
            loading='lazy'
            src='/img/images.webp'
            className='bg-gray-100 rounded-lg'
          />
          <img
            loading='lazy'
            src='/img/thirdImg.jpg'
            className='bg-gray-100 rounded-lg'
          />
        </div>
        <div>
          <h2 style={{ color: "#f05454" }} className='text-3xl font-extrabold tracking-tight text-indigo-700 sm:text-4xl'>
            One product, unlimited solutions
          </h2>
          <p className='mt-4 text-gray-500'>
            Our platform provides a range of features, including event creation and the ability to take registrations, all while accommodating multiple admins.
          </p>

          <dl className='mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8'>
            {features.map((feature) => (
              <div key={feature.name} className='border-t border-gray-200 pt-4'>
                <dt className='font-medium text-gray-900'>{feature.name}</dt>
                <dd className='mt-2 text-sm text-gray-500'>
                  {feature.description.startsWith("Automate") || feature.description.startsWith("Do") || feature.description.startsWith("You") ?
                    feature.description.split(/[.]+/).map((line, index) => (
                      <div style={{display: "flex" }}>
                        <FaCheck
                          className="w-3 h-3 text-green-500 mr-2"
                        />
                        <span key={index}>
                          {line.trim()}
                          <br />
                        </span>
                      </div>
                    )) :
                    feature.description
                  }

                  {/* {feature.description} */}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div >
    </div >
  );
}