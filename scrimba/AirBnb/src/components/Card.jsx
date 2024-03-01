import React from 'react'

function Card(props) {
    let badgeText 
    if(props.openSpots < 1){
      badgeText = "SOLD OUT"
    }else if(props.location === "online"){
      badgeText = "ONLINE"
    }

  return (
    <div className='card'>
        {badgeText && <div className='card--badge'>{badgeText}</div>}
        <img src={`./src/assets/${props.coverImg}`} className='card--image' />
        <div className="card--stats">
                <img src="../src/assets/star.png" alt="star" />
                <span>{props.rating}</span>
                <span className="gray">{props.reviewCount}</span>
                <span className="gray">{props.location}</span>
            </div>
            <p className='card--title'>{props.title}</p>
            <p className='card--price'><span className="bold">From ${props.price}</span> / person</p>
        </div>
  )
}

export default Card