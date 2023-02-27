import React, { Component } from 'react'
//import { movies } from './getMovies'
import axios from 'axios';

export default class MoviesList extends Component{
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }
    
    async componentDidMount(){
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=57a709f405d51563df2563d55a310ec5&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        this.setState({
            movies:[...data.results]
        })
        console.log('mounting done');
    }

    changeMovies=async()=>{
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=57a709f405d51563df2563d55a310ec5&language=en-US&page=${this.state.currPage}`);
        let data = res.data;
        this.setState({
            movies:[...data.results]
        })
    }

    handleRight=()=>{
        let temparr = []
        for(let i = 1 ; i <= this.state.parr.length + 1 ; i++){
            temparr.push(i);
        }
        this.setState({
            parr:[...temparr],
            currPage:this.state.currPage+1
        },this.changeMovies)
    }

    handleLeft=()=>{
        if(this.state.currPage != 1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovies)
        }
    }

    handleClick=(value)=>{
        if(value != this.state.currPage){
            this.setState({
                currPage:value
            }, this.changeMovies)
        }
    }

    handleFavourites=(movie)=>{
        let oldData =JSON.parse(localStorage.getItem('movies') || "[]")
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id!=movie.id)
        }else{
            oldData.push(movie)
        }
        localStorage.setItem("movies", JSON.stringify(oldData));
        this.handleFavouritesState();
    }

    handleFavouritesState=()=>{
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]")
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp]
        })
    }

    render(){
        //let movie = movies.results;
        console.log('render');
        return(
           <>
                {
                    this.state.movies.length==0?
                    <div class="spinner-border text-info" role="status">
                    <span class="visually-hidden">Loading...</span>
                    </div> :
                    <div>
                        <h3 className="text-center"><strong>Trending</strong></h3>
                    
                        <div className="movies-list">
                            {
                                this.state.movies.map((movieObj) => (
                                    <div className="card MoviesList-card" onMouseEnter={() => this.setState({hover: movieObj.id})} onMouseLeave={() => this.setState({hover: ''})}>
                                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} className="card-img-top MoviesList-img"/>
                                        {/*<div className="card-body">*/}
                                            <h4 className="card-title MoviesList-title">{movieObj.original_title}</h4>
                                            
                                            <div className="button-wrapper" style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                                                {
                                                    this.state.hover == movieObj.id &&
                                                    <a href="#" className="btn btn-primary MoviesList-button" onClick={()=>this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove from Favourites":"Add to Favourites"}</a>
                                                } 
                                            </div>
                                        {/*</div>*/}
                                    </div>
                                ))
                            }
                        </div>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                                    {
                                        this.state.parr.map((value) => (
                                            <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                                        ))
                                    }
                                    <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                }
           </>
        )
    }
}