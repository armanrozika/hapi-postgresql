import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import {connect} from 'react-redux'

class Addpost extends Component {
  state = {
      data: {
          img: '',
          name: '',
          price: '',
          description: '',
          picurl: '',
          redirect: false,
      },
      isHidden: "notHidden",
      adding: "isHidden"
  }

  componentDidMount(){
    console.log(this.props)
  }

  onClick = async ()=>{
      //console.log('fetch');
        this.setState({
            isHidden: "isHidden",
            adding: "notHidden"
        })

      const formData = new FormData();
      formData.append('file', this.state.img);

      const options = {
        method: 'POST',
        body: formData,
      };

     await fetch('http://localhost:8000/upload', options).catch(error => console.error('Error:', error));

     const data = {
         name: this.state.name,
         price: this.state.price,
         description: this.state.description,
         picurl: this.state.picurl
     }

     const goFetch = await fetch('http://localhost:8000/post', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    const res = await goFetch.json();
    const bck = await console.log(res)
    this.props.postAdded();
      this.setState({
        redirect: true,
        isHidden: 'notHidden',
        adding: 'isHidden'
      })
  }

  getImg = async (e)=>{
      //console.log(e.target.files[0])
      const setpic = "http://localhost:8000/upload/" + e.target.files[0].name
      await this.setState({
          img: e.target.files[0],
          picurl: setpic
      })

      //const data = this.state;
  }

  changeState = (e)=>{
    this.setState({
        [e.target.name]: e.target.value
    })
  }


  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/'/>
    }
  }

  render() {
    return (
      <div className={`addpost ${this.state.isHidden}`}>
        <p className={this.state.adding}>adding post...</p>
        <div className="field">
            <label className="label">Name</label>
            <div className="control">
                <input onChange={this.changeState} name="name" className="input" type="text" placeholder="Text input" />
            </div>
        </div>
        <div className="field">
            <label className="label">Price</label>
            <div className="control">
                <input onChange={this.changeState} name="price" className="input" type="number" placeholder="Text input" />
            </div>
        </div>
        <div className="field">
            <label className="label">Description</label>
            <div className="control">
                <textarea onChange={this.changeState} name="description" className="textarea" placeholder="Textarea"></textarea>
            </div>
        </div>
        <div className="field">
            <label className="label">Image</label>
            <div className="control">
               <input type="file" onChange={this.getImg}/>
            </div>
        </div>


       {this.renderRedirect()}
        <button onClick={this.onClick} className="button is-primary">SUBMIT</button>

      </div>
    )
  }
}


const mapDisPatchToProps = (dispatch) => {
  return {
    postAdded: () => dispatch({type: 'SHOW_SUCCESS', payload: 'added'})
  }
}

export default connect(null, mapDisPatchToProps)(Addpost);
