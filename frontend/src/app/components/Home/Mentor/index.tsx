'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { MentorType } from '@/app/types/mentor'
import MentorSkeleton from '../../Skeleton/Mentor'
import { resolveUploadOrURL } from '@/utils/resolveUploadOrURL'

const serverUrlForPreview = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:3005';

const Mentor = () => {
  const [mentor, setMentor] = useState<MentorType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/data?t=${Date.now()}`, { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setMentor(data.MentorData)
      } catch (error) {
        console.error('Error fetching service:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && (event.data.type === 'payload-live-preview' || event.data.type === 'payload:live-preview')) {
        const updatedDoc = event.data.data
        if (updatedDoc && 'name' in updatedDoc && 'profession' in updatedDoc && 'imgSrc' in updatedDoc && !('comment' in updatedDoc) && !('about' in updatedDoc)) {
          setMentor((prevMentors) => {
            return prevMentors.map((m) => {
              const matchesId = m.id && updatedDoc.id && (m.id === updatedDoc.id || m.id === updatedDoc._id);
              const matchesName = m.name === updatedDoc.name || m.name === updatedDoc._originalName || m.name.includes(updatedDoc.name) || updatedDoc.name.includes(m.name);
              if (matchesId || (!m.id && matchesName)) {
                return {
                  id: updatedDoc.id || updatedDoc._id || m.id,
                  name: updatedDoc.name,
                  profession: updatedDoc.profession,
                  imgSrc: resolveUploadOrURL(updatedDoc.imgSrc, serverUrlForPreview),
                  link: updatedDoc.link || '',
                }
              }
              return m
            })
          })
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 530,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  }

  return (
    <section className='bg-deep-slate scroll-mt-12' id='mentor'>
      <div className='container relative'>
        <h2 className='text-midnight_text max-w-96 leading-12 lg:leading-14'>
          Meet Our Expert Mentors
        </h2>

        <Slider {...settings}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <MentorSkeleton key={i} />
              ))
            : mentor.map((items, i) => (
                <div key={i}>
                  <div className='m-3 py-14 mt-10 text-center rounded-2xl bg-white shadow-md'>
                    <div className='relative mb-10'>
                      <Image
                        src={items.imgSrc}
                        alt='user-image'
                        width={206}
                        height={206}
                        className='inline-block m-auto rounded-full border border-black/10 object-cover'
                        style={{ aspectRatio: '1 / 1' }}
                      />
                      <div className='absolute right-[22%] -bottom-[2%] bg-white rounded-full p-4 hover:scale-110 duration-300'>
                        {items.link ? (
                          <Link href={items.link} target='_blank' rel='noopener noreferrer' className='block'>
                            <Image
                              src={'/images/mentor/linkedin.svg'}
                              alt='linkedin-image'
                              width={25}
                              height={24}
                            />
                          </Link>
                        ) : (
                          <Image
                            src={'/images/mentor/linkedin.svg'}
                            alt='linkedin-image'
                            width={25}
                            height={24}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <h6>{items.name}</h6>
                      <p className='text-lg font-normal text-black/50 pt-2'>
                        {items.profession}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
        </Slider>
      </div>
    </section>
  )
}

export default Mentor
