//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import ImageCard from "./components/ImageCard";
import Footer from "./components/Footer";
import team from "./team.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    team,
    clickedTeam: [],
    score: 0
  };

//when you click on a card ... the team is taken out of the array

  imageClick = event => {
    const currentTeam = event.target.alt;
    const TeamAlreadyClicked =
      this.state.clickedTeam.indexOf(currentTeam) > -1;

//if you click on a team that has already been selected, the game is reset and cards reordered

    if (TeamAlreadyClicked) {
      this.setState({
        team: this.state.team.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedTeam: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available team, your score is increased and cards reordered
 
    } else {
      this.setState(
        {
          team: this.state.team.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedTeam: this.state.clickedTeam.concat(
            currentTeam
          ),
          score: this.state.score + 1
        },
//if you get all 12 team correct you get a congrats message and the game resets 

        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              fish: this.state.team.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedTeam: [],
              score: 0
            });
          }
        }
      );
    }
  };

  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.team.map(team => (
            <ImageCard
              imageClick={this.imageClick}
              id={team.id}
              key={team.id}
              image={team.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;