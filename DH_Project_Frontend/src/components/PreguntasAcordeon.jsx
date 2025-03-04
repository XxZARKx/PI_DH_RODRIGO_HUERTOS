import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
	accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	"&:not(:last-child)": {
		borderBottom: 0,
	},
	"&::before": {
		display: "none",
	},
}));

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor: "rgba(0, 0, 0, .03)",
	flexDirection: "row-reverse",
	[`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
		{
			transform: "rotate(90deg)",
		},
	[`& .${accordionSummaryClasses.content}`]: {
		marginLeft: theme.spacing(1),
	},
	...theme.applyStyles("dark", {
		backgroundColor: "rgba(255, 255, 255, .05)",
	}),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
	const [expanded, setExpanded] = React.useState("panel1");

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	return (
		<div>
			<Accordion
				expanded={expanded === "panel1"}
				onChange={handleChange("panel1")}>
				<AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
					<Typography component="span">
						¿Cuál es el kilometraje máximo por día de alquiler?
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography className="px-6">
						Máximo 250km por día alquilado. Si el usuario se excede habrá una
						recarga adicional de S/ 0.50 por cada kilómetro adicional.
					</Typography>
				</AccordionDetails>
			</Accordion>
			<Accordion
				expanded={expanded === "panel2"}
				onChange={handleChange("panel2")}>
				<AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
					<Typography component="span">
						¿Puede usar otra persona el auto que alquilé?
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography className="px-6">
						No puede, solo el que reserva y es aceptado por el propietario puede
						manejar el vehículo.
					</Typography>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
