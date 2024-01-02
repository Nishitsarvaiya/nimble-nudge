type IncomingFriendRequest = {
	senderId: string;
	senderEmail: string | null | undefined;
	senderName: string | null | undefined;
};

type Friend = {
	id: string;
	name: string | null | undefined;
	email: string | null | undefined;
};
