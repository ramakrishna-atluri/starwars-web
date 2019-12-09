import React from 'react';

export default function ResponsiveImage({ src, width, height }) {
    return (
      <div
        style={{
          width
        }}
        className="responsive-image"
      >
        <div
          style={{
            paddingBottom: height / width * 100 + "%"
          }}
        />
        <img src={src} alt="responsive_Image" className="responsive-image__image" />
      </div>
    );
  }