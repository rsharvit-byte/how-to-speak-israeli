function isVideo(src) {
  return /\.(mp4|webm|mov)(\?|$)/i.test(src)
}

export default function CardFace({ card }) {
  const media = card.media || card.image

  return (
    <div className={`card-face ${card.background || ''}`}>
      {media ? (
        isVideo(media) ? (
          <video
            className="card-photo"
            src={media}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        ) : (
          <img className="card-photo" src={media} alt="" draggable="false" />
        )
      ) : null}
    </div>
  )
}
