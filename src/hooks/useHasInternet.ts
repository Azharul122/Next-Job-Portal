// "use client"

// import { useEffect, useState } from "react";

//  const useHasInternet = () => {
//   const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

//   useEffect(() => {
//     const updateNetworkStatus = () => {
//       console.log("Network status changed:", navigator.onLine);
//       setIsOnline(navigator.onLine);
//     };

//     window.addEventListener("online", updateNetworkStatus);
//     window.addEventListener("offline", updateNetworkStatus);

//     // Initial check
//     updateNetworkStatus();

//     return () => {
//       window.removeEventListener("online", updateNetworkStatus);
//       window.removeEventListener("offline", updateNetworkStatus);
//     };
//   }, []);

//   return { isOnline }
// };



// export default useHasInternet