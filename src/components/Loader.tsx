import Spinner from "./Spinner";

export default function Loader() {
	return (
		<div className="fixed inset-0">
			<div className="w-full h-full bg-background/80 backdrop-blur-[2px] grid place-items-center">
				<div className="w-20 h-20 grid place-items-center bg-background rounded-2xl border border-gray-500 shadow-xl">
					<Spinner color="" />
				</div>
			</div>
		</div>
	);
}
