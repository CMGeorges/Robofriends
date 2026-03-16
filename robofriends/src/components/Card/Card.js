import React from "react";
import { buildAvatarUrl } from "../../services/share/shareService";
import "./Card.css";

function Card({ email, name, id, onShareAvatar }) {
  return (
    <article className="card">
      <div className="card-media">
        <img src={buildAvatarUrl(id)} alt={`${name} robot avatar`} />
      </div>
      <div className="card-body">
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
      <button className="card-share" type="button" onClick={() => onShareAvatar({ id, name, email })}>
        Share avatar QR
      </button>
    </article>
  );
}

export default Card;
