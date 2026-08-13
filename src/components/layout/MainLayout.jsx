

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

function MainLayout({ children }) {
 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      
      <Navbar onToggleSidebar={toggleSidebar} />

      <div
        style={{
          display: "flex",
          flex: 1,
          position: "relative",
        }}
      >
        
        <>
          
          {isMobile && isSidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.5)",
                zIndex: 40,
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            />
          )}

         
          <motion.div
            initial={isMobile ? { x: -280 } : { x: 0 }}
            animate={{ 
              x: isSidebarOpen ? 0 : (isMobile ? -280 : 0),
            }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 200 
            }}
            style={{
              position: isMobile ? "fixed" : "relative",
              top: isMobile ? 0 : "auto",
              left: 0,
              bottom: 0,
              zIndex: 50,
              height: isMobile ? "100vh" : "auto",
              flexShrink: 0,
            }}
          >
            <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          </motion.div>
        </>

       
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{
            flex: 1,
            padding: "24px",
            backgroundColor: "#f9fafb",
            minHeight: "calc(100vh - 64px)",
            transition: "margin-left 0.3s ease",
            marginLeft: isMobile ? 0 : (isSidebarOpen ? "0" : "0"),
            width: "100%",
            overflowX: "hidden",
          }}
        >
          
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            
            <AnimatePresence mode="wait">
              <motion.div
                key={location?.pathname || "page"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.main>
      </div>

     
      <Footer />
    </div>
  );
}

export default MainLayout;