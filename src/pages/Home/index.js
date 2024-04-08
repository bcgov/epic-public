import { useState } from "react";
import { makeStyles } from "tss-react/mui";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import Header from "components/Header";
import PcpFeed from "components/PcpFeed";
import UpdatesFeed from "components/UpdatesFeed";

import Documents from "./Documents";
import Projects from "./Projects";

import { HOME_TAB_KEYS, HOME_TABS } from "constants/home";

const useStyles = makeStyles()((theme) => ({
	selectedTab: {
		backgroundColor: theme.palette.primary.dark,
		borderRadius: "0.25rem 0.25rem 0 0",
		color: `${theme.palette.common.white} !important`,
	},
	tabs: {
		paddingLeft: "3rem",
	},
	feed: {
		background: "#F6F9FC",
		display: "flex",
		flexWrap: "wrap",
	},
}));

const Home = () => {
	const { classes } = useStyles();

	const [selectedTab, setSelectedTab] = useState(HOME_TAB_KEYS.PROJECTS);

	return (
		<div>
			<Header />
			<Tabs
				aria-label="Main"
				className={classes.tabs}
				onChange={(_, index) => setSelectedTab(index)}
				value={selectedTab}
			>
				{HOME_TABS.map(({ key, name }) => (
					<Tab classes={{ selected: classes.selectedTab }} key={key} label={name} tabIndex={0} />
				))}
			</Tabs>
			<div role="tabpanel">
				{selectedTab === HOME_TAB_KEYS.PROJECTS ? (
					<div>
						<Projects />
						<div className={classes.feed}>
							<UpdatesFeed setSelectedTab={setSelectedTab} />
							<PcpFeed onSelectTab={setSelectedTab}></PcpFeed>
						</div>
					</div>
				) : selectedTab === HOME_TAB_KEYS.DOCUMENTS ? (
					<Documents />
				) : selectedTab === HOME_TAB_KEYS.PUBLIC_COMMENT_PERIODS ? (
					<div>public comment periods</div>
				) : selectedTab === HOME_TAB_KEYS.UPDATES ? (
					<div>updates</div>
				) : selectedTab === HOME_TAB_KEYS.MAP ? (
					<div>view map</div>
				) : (
					<div>uh oh</div>
				)}
			</div>
		</div>
	);
};

export default Home;
