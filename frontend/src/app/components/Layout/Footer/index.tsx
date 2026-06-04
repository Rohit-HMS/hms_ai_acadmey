'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Logo from '../Header/Logo'
import { Icon } from '@iconify/react/dist/iconify.js'
import { FooterLinkType } from '@/app/types/footerlink'

const Footer = () => {
  const [footerlink, SetFooterlink] = useState<FooterLinkType[]>([])
  const [footerData, setFooterData] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/data')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        SetFooterlink(data.FooterLinkData)
      } catch (error) {
        console.error('Error fetching services:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const server = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:3005'
        const res = await fetch(`${server}/api/globals/footer`)
        if (!res.ok) throw new Error('Failed to fetch footer global')
        const data = await res.json()
        setFooterData(data)
      } catch (err) {
        console.error('Error fetching footer global:', err)
      }
    }

    fetchFooter()

    const handleMessage = (event: MessageEvent) => {
      if (event.data && (event.data.type === 'payload-live-preview' || event.data.type === 'payload:live-preview')) {
        const updated = event.data.data
        if (updated && (updated.slug === 'footer' || 'copyrightText' in updated || 'columns' in updated)) {
          setFooterData(updated)
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <footer className='bg-deep-slate pt-10'>
      <div className='container'>
        <div className='grid grid-cols-1 sm:grid-cols-6 lg:gap-20 md:gap-24 sm:gap-12 gap-12 pb-10'>
          <div className='col-span-2'>
            <div className='mb-10'>
              <Logo />
              <p className='text-black/60 text-base font-normal mt-4 max-w-xs leading-relaxed'>
                {footerData?.logoText || 'Empowering the next generation of AI and Full-Stack Engineering leaders with 100% practical, mentor-led coaching.'}
              </p>
            </div>
            <div className='flex items-center gap-4'>
              <Link
                href='https://www.linkedin.com/company/hiddenmind-ai-academy/posts/?feedView=all'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-primary text-black text-3xl'>
                <Icon icon='tabler:brand-linkedin' />
              </Link>
              <Link
                href='https://wa.me/919376778747'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-primary text-black text-3xl'>
                <Icon icon='tabler:brand-whatsapp' />
              </Link>
              <Link
                href='https://www.instagram.com/hms.ai.academy/?hl=en'
                target='_blank'
                rel='noopener noreferrer'
                className='hover:text-primary text-black text-3xl'>
                <Icon icon='tabler:brand-instagram' />
              </Link>
            </div>
          </div>
          <div className='col-span-2'>
            <div className='flex flex-col sm:flex-row gap-10 sm:gap-20'>
              {(footerData?.columns || footerlink).map((product: any, i: number) => (
                <div key={i} className='group relative col-span-2'>
                  <p className='text-black text-xl font-semibold mb-9'>
                    {product.title || product.section}
                  </p>
                  <ul>
                    {(product.links || []).map((item: any, j: number) => (
                      <li key={j} className='mb-3'>
                        <Link
                          href={item.href}
                          className='text-black/60 hover:text-primary text-base font-normal mb-6'
                          target={item.openInNewTab ? '_blank' : undefined}
                          rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className='col-span-2 sm:col-span-6 md:col-span-2'>
            <div className='flex flex-col gap-10'>
              <Link
                href='https://maps.google.com/?q=104,+Sudarshan+Enclave,+Sector+3,+Udaipur,+Rajasthan+313001'
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-start w-fit'>
                <Icon
                  icon='solar:point-on-map-perspective-bold'
                  className='text-primary text-2xl inline-block me-2 mt-0.5 shrink-0'
                />
                <p className='text-black/60 hover:text-primary text-base'>
                  {footerData?.contact?.address || '104, Sudarshan Enclave,Sector 3,Udaipur, Rajasthan (313001)'}
                </p>
              </Link>
              <Link href='tel:+919376778747' className='flex items-start w-fit'>
                <Icon
                  icon='solar:phone-bold'
                  className='text-primary text-2xl inline-block me-2 mt-0.5 shrink-0'
                />
                <p className='text-black/60 hover:text-primary text-base'>
                  {footerData?.contact?.phone || '+91 93767 78747'}
                </p>
              </Link>
              <Link href='mailto:aiacademy.hms@gmail.com' className='flex items-start w-fit'>
                <Icon
                  icon='solar:mailbox-bold'
                  className='text-primary text-2xl inline-block me-2 mt-0.5 shrink-0'
                />
                <p className='text-black/60 hover:text-primary text-base'>
                  {footerData?.contact?.email || 'aiacademy.hms@gmail.com'}
                </p>
              </Link>
            </div>
          </div>
        </div>

        <div className='mt-10 lg:flex items-center justify-between border-t border-black/10 py-5'>
          <p className='text-black/50 text-base text-center lg:text-start font-normal'>
            {footerData?.copyrightText || '@2025 Agency. All Rights Reserved by '}
            {footerData?.footerBottomLinks ? (
              <>
                {" "}
                {footerData.footerBottomLinks.map((link: any, i: number) => (
                  <span key={i} className='mx-1'>
                    <Link href={link.href} target='_blank' className='hover:text-primary hover:underline'>
                      {link.label}
                    </Link>
                  </span>
                ))}
              </>
            ) : (
              <Link
                href='https://getnextjstemplates.com/'
                target='_blank'
                className='hover:text-primary hover:underline'>
                {' '}
                GetNextJsTemplates.com
              </Link>
            )}
          </p>
          <div className='flex gap-5 mt-5 lg:mt-0 justify-center lg:justify-start'>
            <Link href='/' target='_blank'>
              <p className='text-black/50 text-base font-normal hover:text-primary hover:underline px-5 border-r border-grey/20'>
                Privacy policy
              </p>
            </Link>
            <Link href='/' target='_blank'>
              <p className='text-black/50 text-base font-normal hover:text-primary hover:underline'>
                Terms & conditions
              </p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
