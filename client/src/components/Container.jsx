import React from "react";

function Container({ children, className="" }) {
  return (
    <div className={`w-full px-4 md:px-16 py-5 ${className}`}>{children}</div>
  );
}

export default Container;