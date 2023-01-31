import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import styles from "../styles/HomePage.module.css";
import Login from "../components/Login";
import Register from "../components/Register";

const HomePage = () => {
  return (
    <div className={styles.parentContainer}>
      <div className={styles.box1}>
        <div className={styles.text1}>Talk-A-Tive</div>
      </div>
      <div className={styles.box2}>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Register/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  );
};

export default HomePage;
