import React from "react";

const Errors = ({ error, resetErrorBoundary }) => {
  const styles = {
    mainBlock: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "24px",
      marginTop: "40px",
      width: "80%",
    },
    textBlock: {
      color: "red",
      fontSize: "20px",
    },
    errorButton: {
      backgroundColor: "#00df81",
      color: "#031b1b",
      padding: "0.5rem 1.2rem",
      fontSize: "18px",
      fontWeight: "600",
      borderRadius: "12px",
      border: "none",
      marginTop: "34px",
    },
  };
  return (
    <div style={styles.mainBlock}>
      <h2>There was an issue...</h2>
      <p style={styles.textBlock}>{error.message}</p>
      <button style={styles.errorButton} onClick={resetErrorBoundary}>
        Retry
      </button>
    </div>
  );
};

export default Errors;
