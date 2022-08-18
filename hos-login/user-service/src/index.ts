import App from "./app";
import config from "./config";
import express from "express";

/********************************************************
 ******************** APPLICATION MAIN ******************
 ********************************************************/

const main = async () => {
    const app = new App(
        express(), 
        Number(config.APP_PORT)
    );
    
    await app.initialize();
    app.checkDependencies();
    app.run();
};

/********************************************************
 ******************** RUN APPLICATION *******************
 ********************************************************/

main()
    .catch(console.error);