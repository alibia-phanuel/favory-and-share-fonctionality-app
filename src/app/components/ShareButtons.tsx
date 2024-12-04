import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { RxClipboardCopy } from "react-icons/rx";
import React, { useState } from "react";

interface ShareButtonsProps {
  url: string; // Lien à partager
  title?: string; // Titre (utile pour LinkedIn)
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = title ? encodeURIComponent(title) : "";
  const [copied, setCopied] = useState(false);
  // Fonction pour copier le lien
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Réinitialise après 2 secondes
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible de copier le lien.");
    }
  };
  return (
    <div className="flex gap-4 flex-col bg-[#F9FAFB] rounded-lg p-4">
      {/* Partager sur Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3"
        aria-label="Partager sur Facebook"
      >
        <FaFacebook className="text-2xl text-[#1877F2]" />
        <span>Facebook</span>
      </a>

      {/* Partager sur WhatsApp */}
      <a
        className="flex items-center gap-3 "
        href={`https://wa.me/?text=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur WhatsApp"
      >
        <FaSquareWhatsapp className="text-2xl text-[#075E54]" />
        <span>WhatsApp</span>
      </a>

      {/* Partager sur LinkedIn */}
      <a
        className="flex  items-center gap-3"
        href={`https://www.linkedin.com/shareArticle?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Partager sur LinkedIn"
      >
        <FaLinkedin className="text-2xl text-[#0077B5]" />
        <span>LinkedIn</span>
      </a>
      {/* Copier le lien */}
      <button
        onClick={copyToClipboard}
        aria-label="Copier"
        className="flex items-center gap-3 bg-[#39424e] text-white p-2 rounded-md"
      >
        <RxClipboardCopy className="text-2xl" />
        <span>{copied ? "Lien copié !" : "Copier"}</span>
      </button>
    </div>
  );
};

export default ShareButtons;
