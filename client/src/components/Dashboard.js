import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

import {fetchActions} from '../actions/action.js'

class Dashboard extends Component {

  state = {
    isHidden: 'notHidden'
  }

  componentDidMount(){
    this.props.fetchActions()
  }
  
  //delete post
  deletePost = async (id)=>{
    const confirm = window.confirm("Delete this post?");
    if(confirm==true){
       const dat = {
        id: id
      }
      await fetch('http://localhost:8000/delete', {
          method: 'DELETE',
          body: JSON.stringify(dat),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(res => res.json())
      .then(response => console.log('Success:', JSON.stringify(response)))
      .catch(error => console.error('Error:', error));

      window.location.reload()
    }
   
  }

  hide = ()=> {
    this.setState({
      isHidden: 'isHidden'
    })
  }

  render() {
   console.log(this.props.notif)
    const fromDashboard = this.props.states.map((item, index)=>{
        return (<div className="column" key={item.id}>
            <div className="box">
                <img src={item.picurl} alt=""/>
                <div className="block">
                    <p className="title is-4 border-bot">{item.name.length > 12 ? item.name.slice(0,12) + "..." : item.name}</p>
                    <p className="subtitle is-6 over-hidden">{item.description.length > 100 ? item.description.slice(0,100) + "..." : item.description}</p>
                </div>
                <div className="block">
                    <button className="button is-success is-fullwidth is-active no-pointer"> Rp. {item.price}</button>
                </div>
                <div className="tags">
                    <Link to={"/post/" + index} className="tag is-info">EDIT</Link>
                    <span onClick={()=>this.deletePost(item.id)} className="tag is-danger">DELETE</span>
                </div>
            </div>
        </div>)
    });

    const success = this.props.notif === 'added' ? (
      <div className={`notification is-success ${this.state.isHidden}`}>
          <button onClick={this.hide} className="delete"></button>
          <p className="title is-5">Success !</p>
        </div>
    ) : (
        <div></div>
      );

    return (
      <div className="section">
        <div className="container container-top">
            {success}
            <div className="columns grid-four">
                {fromDashboard}
            </div>
        </div>
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

export default connect(mapStateToProps, {fetchActions})(Dashboard);
