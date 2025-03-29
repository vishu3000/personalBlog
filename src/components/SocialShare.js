import {
  copyLink,
  shareOnFacebook,
  shareOnLinkedIn,
  shareOnWhatsApp,
  shareOnX,
} from "@/utils/utils";
import {
  faFacebookF,
  faLinkedinIn,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const SocialShareFixed = (props) => {
  const { currentPath } = props;
  const socialIcons = [
    {
      icon: faFacebookF,
      label: "Share on Facebook",
      color: "bg-blue-600",
      callBack: shareOnFacebook,
    },
    {
      icon: faTwitter,
      label: "Share on Twitter",
      color: "bg-blue-400",
      callBack: shareOnX,
    },
    {
      icon: faLink,
      label: "Copy link",
      color: "bg-red-500",
      callBack: copyLink,
    },
    {
      icon: faLinkedinIn,
      label: "Share on LinkedIn",
      color: "bg-blue-700",
      callBack: shareOnLinkedIn,
    },
    {
      icon: faWhatsapp,
      label: "Share on WhatsApp",
      color: "bg-green-500",
      callBack: shareOnWhatsApp,
    },
  ];

  return (
    <div className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-slate-100 shadow-lg rounded-3xl p-4 ml-8">
      {socialIcons.map(({ icon, label, color, callBack }) => (
        <button
          key={label}
          className={`flex items-center justify-center w-12 h-12 ${color} text-white rounded-full mb-2 transition duration-300 transform hover:scale-110`}
          aria-label={label}
          onClick={() => callBack(currentPath)}
        >
          <FontAwesomeIcon icon={icon} className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
};

export default SocialShareFixed;
