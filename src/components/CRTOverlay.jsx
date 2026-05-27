import React from "react";

export default function CRTOverlay() {
  return (
    <>
      {/* Static line and dot grids */}
      <div className="cyber-grid" aria-hidden="true" />
      <div className="cyber-dots" aria-hidden="true" />
      
      {/* Spotlight overlay following mouse position variables */}
      <div className="cyber-spotlight" aria-hidden="true" />
      
      {/* Vignette border shadowing simulating screen curves */}
      <div className="crt-screen" aria-hidden="true" />
    </>
  );
}
