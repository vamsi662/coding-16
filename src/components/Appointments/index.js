import {v4} from 'uuid'
import {Component} from 'react'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentlist: [], starbutton: false}
  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    this.setState(prevState => ({
      appointmentlist: [
        ...prevState.appointmentlist,
        {id: v4(), title, date, isStar: false},
      ],
      title: '',
      date: '',
    }))
  }
  title = event => {
    this.setState({title: event.target.value})
  }
  date = event => {
    this.setState({date: format(event.target.value, 'dd MMMM yyyy, EEEE')})
  }
  onClickstarbutton = () => {
    this.setState(prevState => ({starbutton: !prevState.starbutton}))
  }
  onClickStarImage = id => {
    const {appointmentlist} = this.state
    const updatedStar = appointmentlist.map(eachAppointment => {
      if (eachAppointment.id === id) {
        return {...eachAppointment, isStart: !eachAppointment.isStar}
      }
      return eachAppointment
    })
    this.setState({appointmentlist: updatedStar})
  }
  render() {
    const {title, date, appointmentlist, starbutton} = this.state
    const list = starbutton
      ? appointmentlist.filter(
          eachAppointment => eachAppointment.isStar === true,
        )
      : appointmentlist
    const starButtonColor = starbutton
      ? 'starred-button-true'
      : 'starred-button'
    return (
      <div className="bg-container">
        <div className="appointment-container">
          <div className="add-appointment-container">
            <form className="input-container" onSubmit={this.addAppointment}>
              <h1>Add Appointment</h1>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <br />
              <input
                value={title}
                id="title"
                type="text"
                onChange={this.title}
                placeholder="Title"
                className="input"
              />
              <br />
              <br />
              <label htmlFor="date" className="label">
                DATE
              </label>
              <br />
              <input
                value={date}
                id="date"
                type="date"
                onChange={this.date}
                placeholder="dd/mm/yyyy"
                className="input"
              />
              <br />
              <br />
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <br />
          <hr className="separator" />
          <div className="starred-con">
            <h1 className="appointments">Appointments</h1>
            <button
              className={`${starButtonColor}`}
              onClick={this.onCLickStarButton}
            >
              Starred
            </button>
          </div>
          <ul className="appointmentlist-con">
            {list.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                onClickStarImage={this.onClickStarImage}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
