import React from 'react'

function Card(props) {
  return (
    <div className="travel-card">
            <div className="travel-card--img-container">
                <img
                    src={props.imageUrl}
                    alt="travel card image"
                    className="travel-card--img"
                />
            </div>
            <div className="travel-card--content">
                <div className="travel-card--location-info">
                    <img
                        src='../src/assets/marker.png'
                        alt="marker icon"
                        className="travel-card--marker"
                    />
                    <p className="travel-card--location">
                        {props.location}
                    </p>
                    <a
                        href={props.googleMapsUrl}
                        target="_blank"
                        className="travel-card--google-maps"
                    >
                        View on Google Maps
                    </a>
                </div>
                <h2 className="travel-card--title">{props.title}</h2>
                <p className="travel-card--date">
                    {`${props.startDate} - ${props.endDate}`}
                </p>
                <p className="travel-card--description">
                    {props.description}
                </p>
            </div>
        </div>
  )
}

export default Card