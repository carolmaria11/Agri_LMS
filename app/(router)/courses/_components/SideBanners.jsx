import GlobalApi from '@/app/_utils/GlobalApi'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function SideBanners() {

    const[sideBannerList,setSideBannerList]=useState([]);

    useEffect(()=>{
        getSideBanners();
    },[])

    const getSideBanners=()=>{
        GlobalApi.getSideBanner().then(resp=>{
            console.log(resp);
            setSideBannerList(resp?.sideBanners || []);
        })
    }

  return (
    <div>
        {sideBannerList.map((item,index)=>(
            <div key={index}>
                <Image src={item.banner.url} alt='banner'
                width={500}
                height={300}
                onClick={()=>window.open(item?.url)}
                className='rounded-xl cursor-pointer hover:shadow-md hover:shadow-emerald-300 mt-3'/>
            </div>
        ))}
    </div>
  )
}

export default SideBanners