import { NextResponse } from 'next/server'
export const dynamic = 'force-dynamic'
import { MentorType } from '@/app/types/mentor'
import { TestimonialType } from '@/app/types/testimonial'
import { CourseType } from '@/app/types/course'
import { HeaderType } from '@/app/types/menu'
import { FooterLinkType } from '@/app/types/footerlink'
import { resolveUploadOrURL } from '@/utils/resolveUploadOrURL'

const HeaderData: HeaderType[] = [
  { label: 'Home', href: '/' },
  { label: 'Courses', href: '/#courses' },
  { label: 'Mentor', href: '/#mentor' },
  { label: 'Contact Us', href: '/#contact' },
]

const TechGaintsData: { imgSrc: string }[] = [
  { imgSrc: '/images/companies/airbnb.svg' },
  { imgSrc: '/images/companies/fedex.svg' },
  { imgSrc: '/images/companies/google.svg' },
  { imgSrc: '/images/companies/hubspot.svg' },
  { imgSrc: '/images/companies/microsoft.svg' },
  { imgSrc: '/images/companies/walmart.svg' },
  { imgSrc: '/images/companies/airbnb.svg' },
  { imgSrc: '/images/companies/fedex.svg' },
]

const FooterLinkData: FooterLinkType[] = [
  {
    section: 'Sitemap',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Courses', href: '/#courses' },
      { label: 'Mentor', href: '/#mentor' },
      { label: 'Contact Us', href: '/#contact' },
    ],
  },
  {
    section: 'Company',
    links: [
      { label: 'Our Team', href: '/' },
      { label: 'career', href: '/' },
      { label: 'Services', href: '/' },
      { label: 'Affiliates', href: '/' },
    ],
  },
]

export const GET = async () => {
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:3005'
  
  let MentorData: MentorType[] = []
  let TestimonialData: TestimonialType[] = []
  let CourseData: CourseType[] = []

  try {
    // Fetch Mentors
    const mentorRes = await fetch(`${cmsUrl}/api/mentors?limit=100&t=${Date.now()}`, { cache: 'no-store' })
    if (mentorRes.ok) {
      const data = await mentorRes.json()
      MentorData = data.docs.map((doc: any) => ({
        id: doc.id || doc._id,
        name: doc.name,
        profession: doc.profession,
        imgSrc: resolveUploadOrURL(doc.imgSrc, cmsUrl),
        link: doc.link || '',
      }))
    }
  } catch (error) {
    console.error('Error fetching mentors from CMS:', error)
  }

  try {
    // Fetch Testimonials
    const testimonialRes = await fetch(`${cmsUrl}/api/testimonials?limit=100&t=${Date.now()}`, { cache: 'no-store' })
    if (testimonialRes.ok) {
      const data = await testimonialRes.json()
      TestimonialData = data.docs.map((doc: any) => ({
        id: doc.id || doc._id,
        name: doc.name,
        profession: doc.profession,
        comment: doc.comment,
        imgSrc: resolveUploadOrURL(doc.imgSrc, cmsUrl),
        rating: doc.rating,
      }))
    }
  } catch (error) {
    console.error('Error fetching testimonials from CMS:', error)
  }

  try {
    // Fetch Courses for any component reading it from /api/data
    const courseRes = await fetch(`${cmsUrl}/api/courses?limit=100&t=${Date.now()}`, { cache: 'no-store' })
    if (courseRes.ok) {
      const data = await courseRes.json()
      CourseData = data.docs.map((doc: any) => ({
        heading: doc.name,
        imgSrc: resolveUploadOrURL(doc.imgSrc, cmsUrl),
        name: doc.mentor,
        students: doc.students,
        classes: doc.classes,
        price: doc.price,
        rating: doc.rating,
        skills: doc.skills ? doc.skills.map((s: any) => typeof s === 'string' ? s : s.skill) : [],
        bestSeller: doc.bestSeller,
      }))
    }
  } catch (error) {
    console.error('Error fetching courses from CMS:', error)
  }

  return NextResponse.json({
    HeaderData,
    TechGaintsData,
    CourseData,
    MentorData,
    TestimonialData,
    FooterLinkData,
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0, must-revalidate',
    }
  })
}
