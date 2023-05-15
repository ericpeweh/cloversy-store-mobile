// Dependencies
import React, { useState } from "react";
import AccordionComponent from "react-native-collapsible/Accordion";

// Icons
import { Ionicons } from "@expo/vector-icons";

// Components
import { useTheme, VStack, Text, HStack, Icon } from "native-base";

interface AccordionProps {
	sections: { label: string; steps: React.ReactElement }[];
}

const PaymentAccordion = ({ sections }: AccordionProps) => {
	const { colors } = useTheme();

	const [activeSections, setActiveSections] = useState<number[]>([]);

	const updateActiveSectionsHandler = (indexes: number[]) => {
		setActiveSections(indexes);
	};

	return (
		<AccordionComponent
			sections={sections}
			expandMultiple={true}
			sectionContainerStyle={{
				borderColor: colors.gray[300],
				borderWidth: 1,
				borderRadius: 10,
				marginBottom: 10,
				overflow: "hidden"
			}}
			renderHeader={(section, _, isActive) => (
				<HStack alignItems="center" justifyContent="space-between" bg="white" padding={4} py={3}>
					<Text color={isActive ? "primary.400" : "black"} fontWeight="500">
						{section.label}
					</Text>
					<Icon
						as={Ionicons}
						name={isActive ? "chevron-up" : "chevron-down"}
						size="md"
						color="gray.400"
						mr={2}
					/>
				</HStack>
			)}
			renderContent={section => section.steps}
			activeSections={activeSections}
			onChange={updateActiveSectionsHandler}
		/>
	);
};

export default PaymentAccordion;
