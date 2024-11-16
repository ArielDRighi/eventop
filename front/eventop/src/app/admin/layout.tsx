import React from "react";

const adminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="eventos-layout bg-gray-900">
      <main>
        {children}
      </main>
    
    </div>
  );
};

export default adminLayout;