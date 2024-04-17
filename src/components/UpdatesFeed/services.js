import BusinessIcon from "@mui/icons-material/Business";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import FoodBankIconOutlined from "@mui/icons-material/FoodBankOutlined";
import PropaneOutlinedIcon from "@mui/icons-material/PropaneOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import WaterDamageOutlinedIcon from "@mui/icons-material/WaterDamageOutlined";

import { PROJECT_TYPE_KEYS } from "constants/filters";

export const getProjectIcon = (projectType) => {
	switch (projectType) {
		case PROJECT_TYPE_KEYS.ENERGY_ELECTRICITY:
			return <ElectricalServicesIcon key={projectType} />;
		case PROJECT_TYPE_KEYS.ENERGY_PETROLEUM:
			return <PropaneOutlinedIcon key={projectType} />;
		case PROJECT_TYPE_KEYS.FOOD_PROCESSING:
			return <FoodBankIconOutlined key={projectType} />;
		case PROJECT_TYPE_KEYS.INDUSTRIAL:
			return <FactoryOutlinedIcon key={projectType} />;
		case PROJECT_TYPE_KEYS.MINES:
			return <BusinessIcon key={projectType} />;
		case PROJECT_TYPE_KEYS.TOURIST_DESTINATION:
			return <TourOutlinedIcon key={projectType} />;
		case PROJECT_TYPE_KEYS.TRANSPORTATION:
			return <EmojiTransportationIcon key={projectType} />;
		case PROJECT_TYPE_KEYS.WATER_MANAGEMENT:
			return <WaterDamageOutlinedIcon key={projectType} />;
		default:
			return <BusinessCenterOutlinedIcon key={projectType} />;
	}
};
