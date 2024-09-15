import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gradient-to-r from-pink-600 to-pink-900 text-white p-3 space-y-6'>
        <section>
          <h1 className='text-2xl italic font-black'>HARRITECH</h1>
          <h1 className='italic'>Security Systems</h1>
        </section>
        <section>
          <h1 className='font-black text-lg'>Contacts</h1>
          <article>Call 0796802258</article>
        </section>
        <section>
          <h1 className='text-lg font-black'>Services</h1>
          <article>Camera installation</article>
          <article>Fence Instalation</article>
        </section>
    </div>
  )
}


export default Footer;