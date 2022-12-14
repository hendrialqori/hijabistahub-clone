import { Layout } from '../../components/layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { LazyLoadImage as Image } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css';
import './home.css'

export default function Home () {
  const [images, setImages] = useState([])
  const [images2, setImages2] = useState([])
  const [sliderImg, setSlider] = useState([])
  const [indexSlide, setIndexSlide] = useState(1)


  useEffect(() => {
    (() => {
      axios.get('/home.json')
        .then(r => {
          setImages(r.data?.home1)
          setImages2(r.data?.home2)
          setSlider(r.data?.slider)
        })
        .catch(e => console.log(e))
    })()
  }, [])

  useEffect(() => {
    setInterval(() => {
      setIndexSlide(prev => {
        return prev >= 3 ? 1 : prev + 1
      })
      
    }, 6000)
  }, [])

  return (
   <Layout>
    <section className='xl:pt-[180px] relative overflow-hidden transition duration-200' aria-label='slider-container'>
      <div className='h-[190px] md:h-[340px] lg:h-[510px]'>
        {
          sliderImg?.map((obj, i) => (
            <div key={i} className={indexSlide === parseInt(obj.id) ? 'slide active-anim' : 'slide'}>
              <Image className='h-full w-full object-fill' alt='slider-image' src={obj.url} effect={'blur'} />
            </div>
          ))
        }
      <div className='hidden absolute bottom-10 left-0 right-0 md:flex gap-2 w-max mx-auto' aria-label='dot-indicatator'>
        {
          Array.from({ length: 3 }).map((dot, i) => (
            <div
              key={i}
              onClick={() => setIndexSlide(prev => i + 1)}
              className={indexSlide === i + 1 ? 'dotActive' : 'dot'}
              role='button'
              tabIndex={0}
              >
              </div>
          ))
        }
      </div>
      </div>
    </section>
    <section className='bg-white w-[100vw]'>
      <section className='mt-[30px] mb-20 w-11/12 mx-auto'>
        <div className='flex flex-wrap justify-center gap-5 md:gap-7' aria-label='container1-image'>
          {
            images?.map(data => (
              <div key={data.id} className='overflow-hidden w-[45%] md:w-[210px] lg:w-[370px]' aria-label='card'>
                <Image className='w-max' src={data.url} alt={'image' + data.id} effect={'blur'} />
              </div>
            ))
          }
        </div>
        <div className='flex justify-center flex-wrap gap-7 mt-9' aria-label='container1-image'>
          {
            images2?.map(data => (
              <div key={data.id} className='overflow-hidden w-max' aria-label='card'>
                <img loading='lazy' className='grow' src={data.url} alt={'image' + data.id} width={window.innerWidth > 1024 ? 580 : 320} />
              </div>
            ))
          }
        </div>
      </section>
    </section>
   </Layout>
  )
}
