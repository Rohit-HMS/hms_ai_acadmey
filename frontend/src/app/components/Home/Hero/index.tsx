'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react/dist/iconify.js'
import { getDynamicCmsUrl } from '@/utils/resolveUploadOrURL'

interface HeroData {
  tagline?: string
  title?: string
  description?: string
  searchPlaceholder?: string
  features?: { text: string }[]
}

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null)

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const server = getDynamicCmsUrl()
        const res = await fetch(`${server}/api/globals/hero`)
        if (!res.ok) throw new Error('Failed to fetch hero global')
        const data = await res.json()
        setHeroData(data)
      } catch (error) {
        console.error('Error fetching hero global:', error)
      }
    }

    fetchHero()

    const handleMessage = (event: MessageEvent) => {
      if (event.data && (event.data.type === 'payload-live-preview' || event.data.type === 'payload:live-preview')) {
        const updated = event.data.data
        if (updated && (updated.slug === 'hero' || 'title' in updated || 'tagline' in updated)) {
          setHeroData(updated)
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const tagline = heroData?.tagline || 'Get 30% off on first enroll'
  const title = heroData?.title || 'BECOME AI-READY IN 30–120 DAYS'
  const description = heroData?.description || 'Don’t Just Learn. Build Real Products.'
  const searchPlaceholder = heroData?.searchPlaceholder || 'Search engineering courses...'
  const features = heroData?.features || [
    { text: 'Flexible Schedules' },
    { text: 'Guided Learning Paths' },
    { text: 'Peer Support Community' },
  ]

  return (
    <section id='home-section' className='bg-slate-gray'>
      <div className='container pt-16'>
        <div className='grid grid-cols-1 lg:grid-cols-12 lg:gap-1 gap-10 items-center'>
          <div className='col-span-6 flex flex-col gap-8'>
            <div className='flex gap-2 mx-auto lg:mx-0'>
              <Icon
                icon='solar:verified-check-bold'
                className='text-success text-xl inline-block me-2'
              />
              <p className='text-success text-sm font-semibold text-center lg:text-start tracking-widest uppercase'>
                {tagline}
              </p>
            </div>
            <h1 className='text-midnight_text lg:text-start text-center font-semibold leading-tight'>
              {title}
            </h1>
            <p className='text-black/70 text-lg lg:text-start text-center max-w-xl'>
              {description}
            </p>
            <div className='relative rounded-full'>
              <input
                type='text'
                name='course'
                className='py-4 pl-8 pr-20 text-lg w-full text-black rounded-full border border-black/10 focus:outline-hidden focus:border-primary duration-300 shadow-input-shadow'
                placeholder={searchPlaceholder}
                autoComplete='off'
              />
              <button className='group border border-secondary bg-secondary hover:bg-transparent p-3 rounded-full absolute right-2 top-1.5 duration-300 hover:cursor-pointer'>
                <Icon
                  icon='solar:magnifer-linear'
                  className='text-white group-hover:text-primary text-2xl inline-block duration-300'
                />
              </button>
            </div>
            <div className='flex flex-wrap items-center justify-start gap-x-8 gap-y-3 pt-10 lg:pt-4'>
              {features.map((feature, idx) => (
                <div key={idx} className='flex gap-2'>
                  <Image
                    src='/images/banner/check-circle.svg'
                    alt='check-image'
                    width={30}
                    height={30}
                    className='smallImage'
                  />
                  <p className='text-sm sm:text-lg font-normal text-black'>
                    {feature.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className='col-span-6 flex justify-center'>
            <Image
              src='/images/banner/mahila.webp'
              alt='nothing'
              width={1000}
              height={805}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
