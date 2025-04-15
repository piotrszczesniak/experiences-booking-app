'use client';

import React from 'react';
import styles from './ShareButtons.module.scss';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailShareButton,
  EmailIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  XIcon,
} from 'react-share';

type ShareButtonsProps = {
  title: string;
  url: string;
  cta: string;
};

const ShareButtons = ({ cta, title, url }: ShareButtonsProps) => {
  return (
    <div className={styles['share-buttons']}>
      <h3 className={styles['cta']}>{cta}</h3>
      <div className={styles['buttons']}>
        <FacebookShareButton url={url} title={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <FacebookMessengerShareButton appId='123456789' url={url} title={title}>
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        <TwitterShareButton url={url} title={title}>
          <XIcon size={32} round />
        </TwitterShareButton>
        <EmailShareButton url={url} subject={title}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
