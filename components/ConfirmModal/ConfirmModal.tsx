// Dependencies
import React, { useRef } from "react";

// Components
import { AlertDialog, Button } from "native-base";

interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	description: string;
	onConfirm: Function;
	cancelText?: string;
	confirmText?: string;
}

const ConfirmModal = ({
	isOpen,
	onClose,
	title,
	description,
	onConfirm,
	cancelText = "Cancel",
	confirmText = "Delete"
}: ConfirmModalProps) => {
	const cancelRef = useRef(null);

	return (
		<AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
			<AlertDialog.Content width="90%">
				<AlertDialog.CloseButton borderRadius="full" _pressed={{ bg: "gray.200" }} />
				<AlertDialog.Header>{title}</AlertDialog.Header>
				<AlertDialog.Body>{description}</AlertDialog.Body>
				<AlertDialog.Footer>
					<Button.Group space={2}>
						<Button
							variant="unstyled"
							colorScheme="coolGray"
							onPress={onClose}
							ref={cancelRef}
							borderRadius="10px"
							px={5}
							py={2}
						>
							{cancelText}
						</Button>
						<Button
							colorScheme="danger"
							onPress={() => {
								onConfirm();
								onClose();
							}}
							borderRadius="10px"
							px={5}
							py={2}
						>
							{confirmText}
						</Button>
					</Button.Group>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog>
	);
};

export default ConfirmModal;
