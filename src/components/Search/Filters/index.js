import { makeStyles } from "tss-react/mui";

import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FilterAltOffOutlinedIcon from "@mui/icons-material/FilterAltOffOutlined";

import { useSearch } from "contexts/Search";

import { getFilterComponent } from "./services";

import { FILTER_KEYS } from "constants";

const useStyles = makeStyles()((theme) => ({
	container: {
		color: "white",
	},
	chips: {
		alignItems: "center",
		display: "flex",
		minHeight: "4rem",
	},
	clear: {
		marginLeft: "1rem",
		minWidth: "8.25rem",
		color: "#FFFFFF",
		fontWeight: 700,
	},
	list: {
		display: "flex",
		flexWrap: "wrap",
		gap: "1rem",
		listStyleType: "none",
		paddingLeft: "1rem",
		"& .MuiChip-root": {
			fontSize: "1rem",
			borderRadius: "0.25rem",
		},
		"& .projectPhases": {
			color: "#022170",
			backgroundColor: "#E3EBFF",
			"& svg": {
				color: "#022170",
			},
		},
		"& .projectRegions": {
			color: "#d32f2f",
			backgroundColor: "#EF9A9A",
			"& svg": {
				color: "#d32f2f",
			},
		},
		"& .proponents": {
			color: "#196F3D",
			backgroundColor: "#DAF7A6",
			"& svg": {
				color: "#196F3D",
			},
		},
		"& .type": {
			color: "#553402",
			backgroundColor: "#FEEBAB",
			"& svg": {
				color: "#553402",
			},
		},
	},
	filters: {
		display: "flex",
		flexWrap: "wrap",
		gap: "1rem",
		paddingBottom: "1rem",
	},
	label: {
		fontWeight: 700,
	},
}));

const Filters = () => {
	const { classes } = useStyles();
	const { filters = [], onClearFilters, onRemoveFilter, selectedFilters } = useSearch();

	return (
		<section aria-labelledby="filters_label" className={classes.container}>
			<div className={classes.chips}>
				<div className={classes.label} id="filters_label">
					Filters:
				</div>
				{!!selectedFilters.length && (
					<>
						<ul className={classes.list}>
							{selectedFilters.map(({ color = "success", description, filterKey, key, legislation }, i) => (
								<li key={i}>
									<Chip
										className={filterKey}
										color={color}
										label={filterKey === FILTER_KEYS.PROJECT_PHASES ? `${description} (${legislation})` : description}
										onDelete={() => onRemoveFilter(filterKey, key)}
										deleteIcon={<CloseRoundedIcon />}
									/>
								</li>
							))}
						</ul>
						<Button className={classes.clear} color="secondary" onClick={onClearFilters}>
							Clear Filters &nbsp; <FilterAltOffOutlinedIcon />
						</Button>
					</>
				)}
			</div>
			<div className={classes.filters}>{filters.map((filterKey) => getFilterComponent(filterKey))}</div>
		</section>
	);
};

export default Filters;
