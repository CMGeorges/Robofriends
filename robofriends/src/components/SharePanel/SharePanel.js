import React from "react";
import { buildAvatarUrl, buildQrCodeUrl, buildShareUrl } from "../../services/share/shareService";
import "./SharePanel.css";

function SharePanel({ robot, accountName, onClose }) {
  const shareUrl = buildShareUrl({
    robotId: robot.id,
    robotName: robot.name,
    ownerName: accountName,
  });

  return (
    <section className="share-panel" aria-live="polite">
      <div>
        <p className="share-label">Avatar QR share</p>
        <h2>{robot.name}</h2>
        <p>
          Share this robot avatar for {accountName}. Anyone scanning the QR can open the
          share link.
        </p>
      </div>

      <div className="share-panel-card">
        <img
          className="share-qr"
          src={buildQrCodeUrl(shareUrl)}
          alt={`QR code for sharing ${robot.name}`}
        />
        <img
          className="share-avatar"
          src={buildAvatarUrl(robot.id)}
          alt={`${robot.name} avatar preview`}
        />
      </div>

      <div className="share-panel-actions">
        <a href={shareUrl} target="_blank" rel="noreferrer">
          Open share link
        </a>
        <button type="button" onClick={onClose}>
          Close share panel
        </button>
      </div>
    </section>
  );
}

export default SharePanel;
