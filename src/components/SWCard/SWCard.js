import React from 'react';
import './SWCard.scss';
import SWLoader from '../SWLoader/SWLoader';

export default class SWCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isFetching: true,
            result: null,
            error: false
        };
    }

    fetchAnswer(err, result){
        if(err){
            this.setState({isFetching: false, error: true})
        }else{
            if(result.type === "String"){
               let body = <p className="answer"> {result.value} </p>
                this.setState({result: body, error: false, isFetching:false})
            }else if(result.type === "Array"){
                let bodyIL = [];
                result.value.forEach(ele => {
                    bodyIL.push(<li>{ele}</li>)
                })
                this.setState({result: <ul className="answer">{bodyIL}</ul>, error: false, isFetching:false})
            }else{
                let body = "Unable to process result"
                this.setState({result: body, error: false, isFetching:false})
            }
        }
    }
    componentDidMount() {
        let question = this.props.question;
        this.setState({question: question.question});
        question.answerFn(this.fetchAnswer.bind(this));
    }

    render() {
        let questionBody = this.state.question? <p> {this.state.question} </p> : '';
        let loadingContent = this.state.isFetching ? <SWLoader></SWLoader> : null;
        let isError = this.state.error ? 'Error Loading Value':null;
        let result = this.state.result;
        let body= '';
        
        if(loadingContent != null && loadingContent){
            body = loadingContent
        }else if(isError!= null && isError){
            body = isError
        }else{
            body= result
        }
        return (
            <div className="wrapper">
                {questionBody}
              {body}
            </div>
        );
      }
  }