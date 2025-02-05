'use client';

import Image from 'next/image';
import Script from 'next/script';
import React, { useState } from 'react';

const TripAdvisor = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  console.log('isScriptLoaded', isScriptLoaded);

  return (
    <aside>
      <div id='TA_selfserveprop232' className='TA_selfserveprop'>
        <ul id='dGSbBIR07fO' className='TA_links ScfyBZ0r'>
          <li id='lkkEehJUsPbD' className='HLetZ8mmCwf'>
            <a target='_blank' href='https://www.tripadvisor.co.uk/'>
              <Image
                width={100}
                height={22}
                data-lazyload='true'
                src='https://www.tripadvisor.co.uk/img/cdsi/img2/branding/150_logo-11900-2.png'
                alt='TripAdvisor'
              />
            </a>
          </li>
        </ul>
      </div>
      <script
        async
        data-cfasync='false'
        src='https://www.jscache.com/wejs?wtype=selfserveprop&amp;uniq=232&amp;locationId=7179577&amp;lang=en_UK&amp;rating=true&amp;nreviews=5&amp;writereviewlink=true&amp;popIdx=true&amp;iswide=false&amp;border=true&amp;display_version=2'
        data-loadtrk
        // onLoad='this.loadtrk=true'
      ></script>
    </aside>
  );
};

export default TripAdvisor;
