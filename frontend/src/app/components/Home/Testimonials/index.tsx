'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { TestimonialType } from '@/app/types/testimonial'
import TestimonialSkeleton from '../../Skeleton/Testimonial'
import { resolveUploadOrURL, getDynamicCmsUrl } from '@/utils/resolveUploadOrURL'

const serverUrlForPreview = getDynamicCmsUrl();

const Testimonial = () => {
  const [testimonial, setTestimonial] = useState<TestimonialType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/data?t=${Date.now()}`, { cache: 'no-store' })
        if (!res.ok) throw new Error('Failed to fetch.')
        const data = await res.json()
        setTestimonial(data.TestimonialData)
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
        if (updatedDoc && 'name' in updatedDoc && 'comment' in updatedDoc && 'rating' in updatedDoc) {
          setTestimonial((prevTestimonials) => {
            return prevTestimonials.map((t) => {
              const matchesId = t.id && updatedDoc.id && (t.id === updatedDoc.id || t.id === updatedDoc._id);
              const matchesName = t.name === updatedDoc.name || t.name === updatedDoc._originalName || t.name.includes(updatedDoc.name) || updatedDoc.name.includes(t.name);
              if (matchesId || (!t.id && matchesName)) {
                return {
                  id: updatedDoc.id || updatedDoc._id || t.id,
                  name: updatedDoc.name,
                  profession: updatedDoc.profession,
                  comment: updatedDoc.comment,
                  imgSrc: resolveUploadOrURL(updatedDoc.imgSrc, serverUrlForPreview),
                  rating: updatedDoc.rating,
                }
              }
              return t
            })
          })
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: false,
    autoplay: false,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const halfStars = rating % 1 >= 0.5 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStars

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <Icon
            key={`full-${i}`}
            icon='tabler:star-filled'
            className='text-yellow-500 text-xl inline-block'
          />
        ))}
        {halfStars > 0 && (
          <Icon
            icon='tabler:star-half-filled'
            className='text-yellow-500 text-xl inline-block'
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon
            key={`empty-${i}`}
            icon='tabler:star-filled'
            className='text-gray-400 text-xl inline-block'
          />
        ))}
      </>
    )
  }

  return (
    <section id='testimonial'>
      <div className='container'>
        <h2 className='text-midnight_text max-w-96'>What Our Learners Say</h2>
        <Slider {...settings}>
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <TestimonialSkeleton key={i} />
              ))
            : testimonial.map((items, i) => (
                <div key={i}>
                  <div
                    className={
                      'bg-white border border-black/10 shadow-md rounded-2xl m-3 p-5 mt-20 relative'
                    }>
                    <div className='absolute top-[-45px]'>
                      <Image
                        src={items.imgSrc}
                        alt={items.name}
                        width={70}
                        height={70}
                        className='inline-block rounded-full border border-black/10'
                      />
                    </div>
                    <p className='text-base font-normal text-darkgray my-4'>
                      {items.comment}
                    </p>
                    <div className='flex justify-between items-center'>
                      <div>
                        <p className='text-lg font-medium text-darkbrown pt-4 pb-2'>
                          {items.name}
                        </p>
                        <p className='text-sm font-normal text-lightgray pb-2'>
                          {items.profession}
                        </p>
                      </div>
                      <div className='flex'>{renderStars(items.rating)}</div>
                    </div>
                  </div>
                </div>
              ))}
        </Slider>
      </div>
    </section>
  )
}

export default Testimonial
