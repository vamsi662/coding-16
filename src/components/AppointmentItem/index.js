import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onClickStarImage} = props
  const {id, title, date, isStar} = appointmentDetails
  const startImage = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const onStar = () => {
    onClickStarImage(id)
  }
  return (
    <li className="item">
      <div className="container">
        <p className="title">{title}</p>
        <button className="btn" onClick={onStar} data-testid="star">
          <img src={startImage} alt="star" />
        </button>
      </div>
      <p className="date">{date}</p>
    </li>
  )
}

export default AppointmentItem
