import React from 'react';
import ResponsiveImage from './ResponsiveImage';
import './App.css';
import SWButton from './components/SWButton/SWButton';
import SWCard from './components/SWCard/SWCard';
import questions from './models/questions';

class App extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        loadResults: false
      };
      
      /*
       Bind our childHandler function to this context
       that will get called from our Child component
      */
      this.childHandler = this.childHandler.bind(this)
  }
  

    /*
     Function that gets called when child button is clicked
    */
    childHandler(dataFromChild){
    this.setState({
        loadResults: !this.state.loadResults
    });
   }

   render(){
    let cards = [];
    if(this.state.loadResults && questions && questions.length>0){
      questions.forEach(question=>{
        cards.push(<SWCard question={question}/>);
      });
    }

    return (
      <div className="App">
        <header className="App-header">
        <ResponsiveImage
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/1041px-Star_Wars_Logo.svg.png"
          width={640}
          height={480}
        />
        </header>
        <SWButton islocked={this.state.loadResults} action={this.childHandler}></SWButton>
        <br/>
        {cards}
        <br/>
      </div>
    );
   }
  
}

export default App;
