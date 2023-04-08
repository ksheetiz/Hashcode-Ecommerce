import React, { useEffect } from 'react'
import Link from "next/link";
import { useRouter } from 'next/router';

function forgot() {
  const router = useRouter();
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/');
    }
  }, [])
  

  return (
    <section className="flex min-h-full items-center justify-center py-12 px-4 sm:px-2 lg:px-4">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full items-center justify-center text-black-800">
          <div className="w-full">
            <div className="block rounded-lg shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-full">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="/logo.svg"
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-12 pb-1 pt-2 text-xl font-semibold">
                        We are The HashCode Society
                      </h4>
                    </div>
                    <form>
                      <p className="mb-4">Please Enter your Registered Email</p>
                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="text"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          placeholder="Username"
                        />
                        <label
                          for="exampleFormControlInput1"
                          className="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-black-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-orange-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black-200 dark:peer-focus:text-black-200"
                        >
                          Email
                        </label>
                      </div>
                      
                      <div className="mb-12 pt-1 pb-1 text-center">
                        <button
                          className="mb-3 inline-block w-full rounded px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-orange-400"
                          type="button"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          Continue
                        </button>
                        
                      </div>
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <Link href={"/signup"}>
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pt-2 pb-[6px] text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-orange-400  hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-opacity-10 bg-orange-400 text-white"
                          >
                            Register
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default forgot
