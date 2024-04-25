import { Popover } from '@headlessui/react';
import Link from "next/link";

export default function HeroHome() {
  return (
    <section>
    <div className='relative bg-white overflow-hidden'>
      <div className='max-w-7xl mx-auto'>
        <div className='relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32'>
          <svg
            className='hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2'
            fill='currentColor'
            viewBox='0 0 100 100'
            preserveAspectRatio='none'
            aria-hidden='true'
          >
            <polygon points='50,0 100,0 50,100 0,100' />
          </svg>

          <Popover>
            <div className='relative pt-6 px-4 sm:px-6 lg:px-8'></div>
          </Popover>

          <section className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28'>
            <div className='sm:text-center lg:text-left'>
              <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                <span className='block xl:inline'>CampusConnect</span>{' '}
                <span style={{fontSize: 40, color: "#f05454"}} >
                  Where Events Unfold, Memories Blossom
                </span>
              </h1>
              <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                CampusConnect is an initiative which can help you in Bringing Your Events to Life: Simplified Registration, Seamless Management, and Easy Registration. 
              </p>
              <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                <div className='rounded-md shadow'>
                <Link href={"/event/allevents"}
                    style={{backgroundColor: "#f05454"}}
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white-700 bg-red-100 hover:bg-red-200 md:py-4 md:text-lg md:px-10'
                >{"Explore All Events"}</Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2'>
        <img
          loading='lazy'
          className='h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full'
          src='https://img.etimg.com/thumb/msid-66025529,width-650,imgsize-273527,,resizemode-4,quality-100/blood-donation_gettyimages.jpg'
          alt='preview'
        />
      </div>
    </div>
    </section>
  );
}