import React from "react";
import Card from "../Card/Card";
import "./CardList.css";

function CardList({ robots, onShareAvatar }) {
  return (
    <section className="card-list" aria-label="Robot directory">
      {robots.map((robot) => (
        <Card
          key={robot.id}
          id={robot.id}
          name={robot.name}
          email={robot.email}
          onShareAvatar={onShareAvatar}
        />
      ))}
    </section>
  );
}

export default CardList;
