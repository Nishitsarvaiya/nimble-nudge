interface User {
	name: string;
	email: string;
	id: string;
	password: string;
}

interface Chat {
	id: string;
	messages: Message[];
}

interface Message {
	id: string;
	senderId: string;
	receiverId: string;
	text: string;
	timestamp: number;
}

interface FriendRequest {
	id: string;
	senderId: string;
	receiverId: string;
}

interface ExtendedUser extends User {
	lastMessage: ExtendedMessage;
}

interface ExtendedMessage extends Message {
	senderImg: string;
	senderName: string;
}
