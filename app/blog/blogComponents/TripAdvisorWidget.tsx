'use client';

import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import React, { useState } from 'react';
import styles from './TripAdvisorWidget.module.scss';

const TripAdvisorWidget = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const handleScriptLoad = () => {
    setIsScriptLoaded(true);
  };

  return (
    <>
      {isScriptLoaded && (
        <div className={styles['tripadvisor-sidebar']}>
          <div id='tripadvisor' className={styles.tripadvisor}>
            <div id='stbmlVRC8kl' className='Xmr6b9eZrr7'>
              <Link
                target='_blank'
                href='https://www.tripadvisor.co.uk/Attraction_Review-g274772-d7179577-Reviews-Bubble_Football_More_by_Bumper_Ball_Experiences-Krakow_Lesser_Poland_Province_Sou.html'
              >
                <Image
                  width={100}
                  height={22}
                  src='https://www.tripadvisor.co.uk/img/cdsi/img2/branding/v2/Tripadvisor_lockup_horizontal_secondary_registered-11900-2.svg'
                  alt='TripAdvisor'
                />
              </Link>
            </div>
          </div>
        </div>
      )}

      <Script
        src='https://www.jscache.com/wejs?wtype=selfserveprop&amp;uniq=953&amp;locationId=7179577&amp;lang=en_UK&amp;rating=true&amp;nreviews=4&amp;writereviewlink=true&amp;popIdx=true&amp;iswide=true&amp;border=false&amp;display_version=2'
        data-loadtrk
        onLoad={handleScriptLoad}
      />
    </>
  );
};

export default TripAdvisorWidget;
