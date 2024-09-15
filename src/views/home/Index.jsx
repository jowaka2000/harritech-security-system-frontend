import React from 'react'
import LeadingItemComponent from '../../components/home/LeadingItemComponent';
import SecondComponent from '../../components/home/SecondComponent';
import ThirdComponent from '../../components/home/ThirdComponent';

const Index = () => {
  return (
    <div className='space-y-8'>
        <LeadingItemComponent />

        <SecondComponent />

        <ThirdComponent />
    </div>
  )
}


export default Index;