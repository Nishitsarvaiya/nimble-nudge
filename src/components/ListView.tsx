import Messages from "./Messages";

type Props = {};

export default function Listview({}: Props) {
	return (
		<div className="h-full border-r">
			<Messages />
		</div>
	);
}
