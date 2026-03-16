import { appConfig } from "../../config/appConfig";

export const buildAvatarUrl = (id) => `https://robohash.org/${id}?200x200`;

export const buildShareUrl = ({ robotId, robotName, ownerName }) =>
  `${appConfig.shareBaseUrl}/share?robot=${robotId}&name=${encodeURIComponent(
    robotName
  )}&owner=${encodeURIComponent(ownerName)}`;

export const buildQrCodeUrl = (shareUrl) =>
  `${appConfig.qrBaseUrl}?size=220x220&data=${encodeURIComponent(shareUrl)}`;
