// File: AccordionSection.js
import { useState } from "react";
import { __ } from "@wordpress/i18n";
import { Icon } from '@wordpress/components';

const AccordionSection = ({ title, children, defaultOpen = false }) => {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<div className={`th-accordion-section ${open ? "open" : ""}`}>
			<div className="accordion-header" onClick={() => setOpen(!open)}>
				<span>{title}</span>
				<span className="accordion-icon rotated">
					<Icon icon="chevron-down" />
					</span>
			</div>
			{open && <div className="accordion-body">{children}</div>}
		</div>
	);
};

export default AccordionSection;