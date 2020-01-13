import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

const authors =[
    {
        name: 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource: 'Wikimedia commons',
        books: ['The Adventures of Huckleberry Fin',
                'Life on the Mississippi',
            'Roughing It']
    },
    {
        name: 'Charles Dickens',
        imageUrl: 'images/authors/charlesdickens.jpg',
        imageSource: 'Wikimedia commons',
        books: ['A Christmas Carol',
            'Oliver Twist']
    },
    {
        name: 'J K Rowling',
        imageUrl: 'images/authors/jkrowling.jpg',
        imageSource: 'Wikimedia commons',
        books: ['Harry Potter and the Philosophers Stone']
    },
    {
        name: 'Joseph Conrad',
        imageUrl: 'images/authors/JosephConrad.png',
        imageSource: 'Wikimedia commons',
        books: ['Heart of Darkness',
                'Lord Jim']
    },
    {
        name: 'Shakespeare',
        imageUrl: 'images/authors/shakespeare.jpg',
        imageSource: 'Wikimedia commons',
        books: ['The Phoenix and the turtle']
    },
    {
        name: 'Strephen King',
        imageUrl: 'images/authors/stephenKing.jpg',
        imageSource: 'Wikimedia commons',
        books: ['The Shining',
                'Doctor Sleep']
    }
];

function getTurnData(authors){
    const allBooks = authors.reduce(function(p,c,i){
        return p.concat(c.books);
    }, []);
    const fourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourRandomBooks)

    return {
        books: fourRandomBooks,
        author: authors.find((author)=>
        author.books.some((title)=>
        title===answer))
    }
}

const state = {
    turnData: getTurnData(authors),
    highlight: 'correct'
    
};

function onAnswerSelected(answer){
    const isCorrect = state.turnData.author.books.some((book)=>book === answer); 
    state.highlight= isCorrect? 'correct': 'wrong';
    render();
}

function render(){
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}/>, document.getElementById('root')); 
}

render();
serviceWorker.unregister();
