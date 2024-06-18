
function Footer(){

    const styles = {
        backgroundColor: "hsla(349, 14%, 16%,100%)",
        color: "white",
        fontSize: "12px",
        padding: "3px 3px",
        textAlign: "center",
        borderBottomRightRadius: "10px",
        borderBottomLeftRadius: "10px",
        width: "100%",
    }

    return(
        <footer style={styles}>
            <p>&copy; {new Date().getFullYear()} Niehr Project</p>
        </footer>
    );
}

export default Footer