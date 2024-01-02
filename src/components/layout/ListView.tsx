import MessagesView from "./MessagesView";

type Props = {};

export default function Listview({}: Props) {
	return (
		<div className="h-full border-r">
			<MessagesView />
		</div>
	);
}
