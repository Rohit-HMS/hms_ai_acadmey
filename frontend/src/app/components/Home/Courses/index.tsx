'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { CourseDetail } from '@/data/courses'
import CourseSkeleton from '../../Skeleton/Course'
import { resolveUploadOrURL } from '@/utils/resolveUploadOrURL'

const NextArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      className='absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-all duration-300 hover:cursor-pointer -mr-14 sm:-mr-14'
      onClick={onClick}
      aria-label='Next slide'>
      <Icon icon='solar:alt-arrow-right-linear' className='text-xl' />
    </button>
  )
}

const PrevArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      className='absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-all duration-300 hover:cursor-pointer -ml-14 sm:-ml-14'
      onClick={onClick}
      aria-label='Previous slide'>
      <Icon icon='solar:alt-arrow-left-linear' className='text-xl' />
    </button>
  )
}

const serverUrlForPreview = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:3005';

const Courses = () => {
  const [courses, setCourses] = useState<CourseDetail[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses')
        if (!res.ok) throw new Error('Failed to fetch courses')
        const data = await res.json()
        setCourses(data)
      } catch (error) {
        console.error('Error fetching courses:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && (event.data.type === 'payload-live-preview' || event.data.type === 'payload:live-preview')) {
        const updatedDoc = event.data.data
        if (updatedDoc && 'slug' in updatedDoc && 'price' in updatedDoc && 'classes' in updatedDoc) {
          setCourses((prevCourses) => {
            return prevCourses.map((c) => {
              if (c.slug === updatedDoc.slug) {
                return {
                  id: updatedDoc.id || updatedDoc._id,
                  slug: updatedDoc.slug,
                  name: updatedDoc.name,
                  duration: updatedDoc.duration,
                  level: updatedDoc.level,
                  shortDescription: updatedDoc.shortDescription,
                  icon: resolveUploadOrURL(updatedDoc.icon, serverUrlForPreview),
                  imgSrc: resolveUploadOrURL(updatedDoc.imgSrc, serverUrlForPreview),
                  mentor: updatedDoc.mentor,
                  price: updatedDoc.price,
                  rating: updatedDoc.rating,
                  bestSeller: updatedDoc.bestSeller,
                  classes: updatedDoc.classes,
                  students: updatedDoc.students,
                  about: updatedDoc.about,
                  features: updatedDoc.features ? updatedDoc.features.map((f: any) => typeof f === 'string' ? f : (f.feature || '')) : [],
                  skills: updatedDoc.skills ? updatedDoc.skills.map((s: any) => typeof s === 'string' ? s : (s.skill || '')) : [],
                  careers: updatedDoc.careers ? updatedDoc.careers.map((cr: any) => ({
                    career: typeof cr === 'string' ? cr : (cr.career || ''),
                    salary: typeof cr === 'string' ? '' : (cr.salary || ''),
                  })) : [],
                  projects: updatedDoc.projects ? updatedDoc.projects.map((p: any) => ({
                    title: p.title,
                    description: p.description,
                    tech: p.tech ? p.tech.map((t: any) => typeof t === 'string' ? t : (t.techName || '')) : [],
                  })) : [],
                  weeks: updatedDoc.weeks ? updatedDoc.weeks.map((w: any) => ({
                    week: w.week,
                    topic: w.topic,
                    outcomes: w.outcomes ? w.outcomes.map((o: any) => typeof o === 'string' ? o : (o.outcome || '')) : [],
                  })) : [],
                }
              }
              return c
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
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: false,
    speed: 500,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: false, // hide arrows on mobile
        },
      },
    ],
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating)
    const halfStars = rating % 1 >= 0.5 ? 1 : 0
    const emptyStars = 5 - fullStars - halfStars

    return (
      <div className='flex gap-0.5'>
        {[...Array(fullStars)].map((_, i) => (
          <Icon
            key={`full-${i}`}
            icon='tabler:star-filled'
            className='text-yellow-500 text-base inline-block'
          />
        ))}
        {halfStars > 0 && (
          <Icon
            icon='tabler:star-half-filled'
            className='text-yellow-500 text-base inline-block'
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Icon
            key={`empty-${i}`}
            icon='tabler:star-filled'
            className='text-gray-300 text-base inline-block'
          />
        ))}
      </div>
    )
  }

  return (
    <section id='courses' className='scroll-mt-12 pb-20'>
      <div className='container'>
        <div className='sm:flex justify-between items-center mb-10'>
          <h2 className='text-midnight_text mb-5 sm:mb-0 capitalize'>
            Popular courses
          </h2>
          <Link
            href={'/#courses'}
            className='text-primary text-lg font-medium hover:underline duration-500'>
            Browse All Courses&nbsp;&gt;
          </Link>
        </div>
        <div className='relative px-0 sm:px-6'>
          <Slider {...settings}>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <CourseSkeleton key={i} />
                ))
              : courses.map((items, i) => (
                  <div key={i} className='pb-4'>
                    <Link
                      href={`/courses/${items.slug}`}
                      className='block bg-white border border-gray-100 rounded-3xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 m-3 h-[470px] flex flex-col justify-between'
                    >
                      <div>
                        {/* Image Container */}
                        <div className='relative rounded-2xl'>
                          <div className='rounded-2xl overflow-hidden aspect-[357/220] relative bg-slate-100'>
                            <Image
                              src={items.imgSrc}
                              alt={items.name}
                              fill
                              sizes='(max-width: 768px) 100vw, 33vw'
                              className='object-cover rounded-2xl group-hover:scale-102 transition-transform duration-500'
                            />
                          </div>
                          {items.bestSeller && (
                            <div className='absolute right-4 -bottom-3 bg-secondary px-4 py-2 rounded-full shadow-md z-10'>
                              <p className='text-white uppercase text-center text-[10px] font-bold tracking-wider'>
                                BEST SELLER
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Title & Mentor */}
                        <div className='px-1 pt-6'>
                          <h3 className='text-xl font-bold text-[#111827] leading-tight line-clamp-2 h-[56px]'>
                            {items.name}
                          </h3>
                          <p className='text-sm font-medium text-gray-500 pt-2'>
                            {items.mentor}
                          </p>
                        </div>
                      </div>

                      <div>
                        {/* Rating & Price */}
                        <div className='px-1 pb-4 flex justify-between items-center'>
                          <div className='flex items-center gap-2'>
                            <span className='text-red-600 text-lg font-bold'>
                              {items.rating.toFixed(1)}
                            </span>
                            <div className='flex items-center'>
                              {renderStars(items.rating)}
                            </div>
                          </div>
                          <span className='text-2xl font-bold text-[#111827]'>
                            ₹{items.price}
                          </span>
                        </div>

                        {/* Divider */}
                        <div className='border-t border-gray-100 w-full' />

                        {/* Footer Metrics */}
                        <div className='px-1 pt-4 flex justify-between items-center'>
                          <div className='flex items-center text-gray-600 text-sm font-medium'>
                            <Icon
                              icon='solar:notebook-linear'
                              className='text-primary text-lg mr-2'
                            />
                            <span>{items.classes} Classes</span>
                          </div>
                          <div className='flex items-center text-gray-600 text-sm font-medium'>
                            <Icon
                              icon='solar:users-group-rounded-linear'
                              className='text-primary text-lg mr-2'
                            />
                            <span>{items.students} Students</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
          </Slider>
        </div>
      </div>
    </section>
  )
}

export default Courses
