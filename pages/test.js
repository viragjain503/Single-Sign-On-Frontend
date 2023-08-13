import React, { useEffect } from "react";

function ReferringPageInfo() {
  useEffect(() => {
    // Access the referrer property when the component mounts
    const referringPage = document.referrer;
    console.log("Referring page:", referringPage);
  }, []);

  return (
    <div>
      {/* Your component's JSX */}
    </div>
  );
}

export default ReferringPageInfo;
