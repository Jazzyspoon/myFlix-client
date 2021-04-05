import React from "react";
import "./movie-view.scss";
export class MovieCard extends React.Component {
  render() {
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">
        {movieData.Title}
      </div>
    );
  }
}

//     return (
//       <div className="movie-view">
//         <div className="movie-poster">
//           <img src={movieData.ImagePath} alt={movieData.Title} />
//         </div>
//         <div className="movie-title">
//           <span className="label">Title: </span>
//           <span className="value">{movieData.Title}</span>
//         </div>
//         <div className="movie-description">
//           <span className="label">Description: </span>
//           <span className="value">{movieData.Description}</span>
//         </div>
//         <div className="movie-genre">
//           <span className="label">Genre: </span>
//           <span className="value">{movieData.Genre.Name}</span>
//         </div>
//         <div className="movie-director">
//           <span className="label">Director: </span>
//           <span className="value">{movieData.Director.Name}</span>
//         </div>
//         <button
//           onClick={() => {
//             onBackClick(null);
//           }}
//         >
//           Back
//         </button>
//       </div>
//     );
//   }
// }
