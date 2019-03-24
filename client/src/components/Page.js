import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchActions} from '../actions/action.js'

class Page extends Component {
    state = {
        name: this.props.states[this.props.match.params.id].name,
        price:  this.props.states[this.props.match.params.id].price,
        description: this.props.states[this.props.match.params.id].description,
        picurl: this.props.states[this.props.match.params.id].picurl,
        img: '',
        index: this.props.match.params.id,
        redirect: false,
        isHidden: 'isHidden',
        hideBody: 'notHidden'
    }

    componentDidMount(){
        //this.props.fetchActions()
        console.log(this.props.states)
         console.log(this.state.name.length)
    }

    changeState = (e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state.name)
    }

    getImg = async (e)=>{
        const setpic = "http://localhost:8000/upload/" + e.target.files[0].name
          await this.setState({
              img: e.target.files[0],
              picurl: setpic
          })

          //console.log(this.state.picurl)
    }

    onClick = async (e)=>{
        this.setState({
            isHidden: 'notHidden',
            hideBody: 'isHidden'
        })
        const formData = new FormData();
        formData.append('file', this.state.img);
        const options = {
            method: 'POST',
            body: formData,
        };
        await fetch('http://localhost:8000/upload', options).catch(error => console.error('Error:', error));
        

        const data = {
             id: this.props.states[this.props.match.params.id].id,
             name: this.state.name,
             price: this.state.price,
             description: this.state.description,
             picurl: this.state.picurl
        }

        await fetch('http://localhost:8000/update', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
        this.props.postAdded();
        this.setState({
            redirect: true,
            isHidden: 'isHidden',
            hideBody: 'notHidden'
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/'/>
        }
    }


  render() {
  	const index = this.props.match.params.id
    return (
      <div className="addpost">
        <p className={this.state.isHidden}>editing post...</p>
        <h1 className={this.state.hideBody}>Edit</h1>
        <div className={`field ${this.state.hideBody}`}>
            <label className="label">Name</label>
            <div className="control">
                <input onChange={this.changeState} name="name" className="input" type="text" placeholder="Text input" value={this.state.name}/>
            </div>
        </div>
        <div className={`field ${this.state.hideBody}`}>
            <label className="label">Price</label>
            <div className="control">
                <input onChange={this.changeState} name="price" className="input" type="number" placeholder="Text input" value={this.state.price}/>
            </div>
        </div>
        <div className={`field ${this.state.hideBody}`}>
            <label className="label">Description</label>
            <div className="control">
                <textarea onChange={this.changeState} name="description" className="textarea" placeholder="Textarea" value={this.state.description}></textarea>
            </div>
        </div>
        <div className={`field ${this.state.hideBody}`}>
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

const mapStateToProps = (state) => {
  return {
    states: state.data,
    notif: state.addpost
  }
}

const mapDisPatchToProps = (dispatch) => {
  return {
    postAdded: () => dispatch({type: 'SHOW_SUCCESS', payload: 'added'})
  }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Page);