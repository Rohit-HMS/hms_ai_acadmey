import { NextRequest, NextResponse } from 'next/server'
import { resolveUploadOrURL } from '@/utils/resolveUploadOrURL'

export const GET = async (req: NextRequest) => {
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:3005'
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')

  try {
    if (slug) {
      // Fetch single course details by slug
      const res = await fetch(`${cmsUrl}/api/courses?where[slug][equals]=${slug}&t=${Date.now()}`, { cache: 'no-store' })
      if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch course from CMS' }, { status: res.status })
      }
      
      const data = await res.json()
      if (!data.docs || data.docs.length === 0) {
        return NextResponse.json({ error: 'Course not found' }, { status: 404 })
      }

      const c = data.docs[0]
      // Map to CourseDetail type
      const mappedCourse = {
        id: c.id || c._id,
        slug: c.slug,
        name: c.name,
        duration: c.duration,
        level: c.level,
        shortDescription: c.shortDescription,
        icon: resolveUploadOrURL(c.icon, cmsUrl),
        imgSrc: resolveUploadOrURL(c.imgSrc, cmsUrl),
        mentor: c.mentor,
        price: c.price,
        rating: c.rating,
        bestSeller: c.bestSeller,
        classes: c.classes,
        students: c.students,
        about: c.about,
        features: [],
        skills: [],
        careers: c.careers ? c.careers.map((cr: any) => ({ career: cr.career || '', salary: cr.salary || '' })) : [],
        projects: [],
        weeks: c.weeks ? c.weeks.map((w: any) => ({
          week: w.week,
          topic: w.topic,
          outcomes: w.outcomes ? w.outcomes.map((o: any) => typeof o === 'string' ? o : o.outcome) : [],
        })) : [],
      }

      return NextResponse.json(mappedCourse)
    } else {
      // Fetch all courses
      const res = await fetch(`${cmsUrl}/api/courses?limit=100&t=${Date.now()}`, { cache: 'no-store' })
      if (!res.ok) {
        return NextResponse.json({ error: 'Failed to fetch courses from CMS' }, { status: res.status })
      }

      const data = await res.json()
      const mappedCourses = data.docs.map((c: any) => ({
        id: c.id || c._id,
        slug: c.slug,
        name: c.name,
        duration: c.duration,
        level: c.level,
        shortDescription: c.shortDescription,
        icon: resolveUploadOrURL(c.icon, cmsUrl),
        imgSrc: resolveUploadOrURL(c.imgSrc, cmsUrl),
        mentor: c.mentor,
        price: c.price,
        rating: c.rating,
        bestSeller: c.bestSeller,
        classes: c.classes,
        students: c.students,
        about: c.about,
        features: [],
        skills: [],
        careers: c.careers ? c.careers.map((cr: any) => ({ career: cr.career || '', salary: cr.salary || '' })) : [],
        projects: [],
        weeks: c.weeks ? c.weeks.map((w: any) => ({
          week: w.week,
          topic: w.topic,
          outcomes: w.outcomes ? w.outcomes.map((o: any) => typeof o === 'string' ? o : o.outcome) : [],
        })) : [],
      }))

      return NextResponse.json(mappedCourses)
    }
  } catch (error) {
    console.error('Error in proxy route /api/courses:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
