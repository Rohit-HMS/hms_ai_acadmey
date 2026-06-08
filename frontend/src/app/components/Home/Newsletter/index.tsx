'use client'
import React, { useState } from 'react'
import { Icon } from '@iconify/react'

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [loader, setLoader] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setLoader(true)
    setFeedback(null)
    setSuccess(false)

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setSuccess(true)
      setFeedback('Thank you for subscribing! Please check your inbox for the brochure PDF.')
      setEmail('')
    } catch (err: any) {
      console.error('Subscription error:', err)
      setFeedback(err.message || 'Failed to subscribe. Please try again.')
    } finally {
      setLoader(false)
    }
  }

  return (
    <section>
      <div className='container'>
        <div className='grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-12 xl:gap-x-8'>
          <div className='col-span-12 bg-newsletter-bg bg-cover rounded-2xl bg-no-repeat px-4'>
            <div className='mb-10 mt-24 lg:mx-64 lg:my-24 relative'>
              <h2 className='text-center font-semibold text-white mb-3'>
                Newsletter.
              </h2>
              <p className='text-base font-normal text-white/75 text-center mb-8 capitalize'>
                Subscribe to our newsletter for discounts, <br /> promo and many
                more.
              </p>
              <form onSubmit={handleSubmit}>
                <div className='relative rounded-full'>
                  <input
                    type='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loader}
                    className='py-4 pl-8 pr-20 text-lg w-full bg-white text-black rounded-full border border-white/10 focus:outline-hidden focus:border-primary duration-300 shadow-input-shadow'
                    placeholder='Enter your email address'
                    autoComplete='off'
                  />
                  <button
                    type='submit'
                    disabled={loader || !email}
                    className='group border border-secondary bg-secondary hover:bg-transparent p-3 rounded-full absolute right-2 top-1.5 duration-300 hover:cursor-pointer flex items-center justify-center min-w-[48px] min-h-[48px]'
                  >
                    {loader ? (
                      <div className='w-5 h-5 rounded-full animate-spin border-2 border-solid border-white border-t-transparent'></div>
                    ) : (
                      <Icon
                        icon='mynaui:send-solid'
                        className='text-white group-hover:text-primary text-2xl inline-block duration-300'
                      />
                    )}
                  </button>
                </div>
              </form>

              {feedback && (
                <div className={`mt-4 text-center text-sm font-medium px-4 py-2 rounded-full inline-block left-1/2 -translate-x-1/2 relative
                  ${success ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}
                >
                  {feedback}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter
